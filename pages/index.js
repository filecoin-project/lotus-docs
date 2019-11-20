import * as React from 'react';
import * as Strings from '~/common/strings';
import * as Constants from '~/common/constants';
import * as Utilities from '~/common/utilities';

import { H1, H2, BODY } from '~/components/Text';
import { Button } from '~/components/Form';
import { Value } from 'slate';
import { css } from 'react-emotion';

import QueryString from 'qs';
import MiniSearch from 'minisearch';
import DocumentHead from '~/components/DocumentHead';
import Navigation from '~/components/Navigation';
import EntityEditor from '~/components-editor/EntityEditor';
import SearchResults from '~/components/SearchResults';
import GlossaryResults from '~/components/GlossaryResults';
import Footer from '~/components/Footer';
import GlobalTooltips from '~/components/GlobalTooltips';
import TableOfContents from '~/components/TableOfContents';

import LibraryEnglish from '~/libraries/library-english';
import LibraryChinese from '~/libraries/library-chinese';

const SEARCH_LIMIT = 20;

const STYLES_SEARCH_CONTAINER = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    display: block;
  }
`;

// NOTE(jim): Magic one off measurement for optical alignment :(
const STYLES_SEARCH_CONTAINER_RESULTS = css`
  min-width: 10%;
  width: 100%;
  padding-top: 1px;
`;

const STYLES_MAIN_SECTION = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;

  @media (max-width: 768px) {
    display: block;
  }
`;

const STYLES_BODY = css`
  min-width: 10%;
  width: 100%;
  padding: 152px 0 128px 304px;
  min-height: 100vh;
  display: block;

  @media (max-width: 768px) {
    padding: 144px 0 24px 0;
  }
`;

const insertPost = (id, post, documents) => {
  const value = Strings.parseMD(post.value);

  if (!value) {
    return;
  }

  if (!value.document) {
    return;
  }

  value.document.nodes.forEach(node => {
    if (Strings.isEmpty(node.text)) {
      return;
    }

    id = id + 1;

    documents.push({
      id,
      text: node.text,
      post: {
        ...post,
        text: node.text,
        isCode: node.type === 'CODE',
      },
    });
  });

  id = id + 1;

  documents.push({
    id,
    title: post.title,
    post: { ...post, text: null, isCode: false },
  });

  return documents;
};

export default class IndexPage extends React.Component {
  _search = null;
  _input = null;
  _posts = {};

  static getInitialProps(ctx) {
    let library = LibraryEnglish;
    if (ctx.req.params.language === 'cn') {
      library = LibraryChinese;
    }

    let post = library.posts[1];
    const currentRoute = `${ctx.req.params.language}${ctx.req.params.slug}`;
    for (let i = 0; i < library.posts.length; i++) {
      if (library.posts[i].slug === currentRoute) {
        post = library.posts[i];
        break;
      }

      for (let j = 0; j < library.posts[i].posts.length; j++) {
        if (library.posts[i].posts[j].slug === currentRoute) {
          post = library.posts[i].posts[j];
          break;
        }
      }
    }

    return {
      language: ctx.req.params.language,
      post,
      library,
    };
  }

  _menu;

  state = {
    value: Value.fromJSON(Strings.parseMD(this.props.post.value)),
    search: '',
    searchResults: [],
    glossary: false,
  };

  componentWillUnmount() {
    this._search = null;
    this._posts = null;
  }

  componentDidMount() {
    if (!this._search) {
      this._search = new MiniSearch({
        fields: ['title', 'text'],
        storeFields: ['title', 'text', 'post'],
        searchOptions: {
          boost: { title: 3 },
        },
      });

      let documents = [];

      let id = 0;

      if (!this.props.library) {
        return;
      }

      for (let i = 0; i < this.props.library.posts.length; i++) {
        const post = this.props.library.posts[i];
        documents = insertPost(id, post, documents);

        for (let j = 0; j < post.posts.length; j++) {
          const subpost = post.posts[j];
          documents = insertPost(id, subpost, documents);
        }
      }

      this._search.addAll(documents);
    }

    const query = QueryString.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    if (query.search) {
      this.onInputChange({ target: { value: query.search } });
      this._input.focus();
    }

    if (query.glossary) {
      this.setState({ glossary: true });
    }
  }

  _handleGetSearchInput = ref => {
    this._input = ref;
  };

  _setMenuReference = ref => {
    this._menu = ref;
  };

  onInputChange = ({ target }) => {
    const results = this._search.search(target.value);
    const searchResults = [];

    let total = 0;
    for (let i = 0; i < results.length; i++) {
      if (total > SEARCH_LIMIT) {
        break;
      }

      total += 1;

      searchResults.push(results[i]);
    }

    return this.setState({
      search: target.value,
      searchResults,
      glossary: false,
    });
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  componentDidUpdate = () => {
    this.updateMenu();
  };

  updateMenu = () => {
    if (!process.browser) {
      return;
    }

    const menu = this._menu;
    if (!menu) {
      return;
    }

    const { value } = this.state;
    const { fragment, selection } = value;
    const { isBlurred, isCollapsed } = selection;

    if (isBlurred || isCollapsed || fragment.text === '') {
      menu.removeAttribute('style');
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    menu.style.visibility = 'visible';

    menu.style.opacity = 1;

    const nextTop = rect.top + window.pageYOffset - menu.offsetHeight;
    menu.style.top = `${nextTop}px`;

    const nextLeft =
      rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2;
    menu.style.left = nextLeft >= 24 ? `${nextLeft}px` : `24px`;
  };

  renderEditor = (props, editor, next) => {
    const children = next();

    return <React.Fragment>{children}</React.Fragment>;
  };

  _handleClearSearch = () => {
    this.setState({ search: '' });
  };

  render() {
    const titleString = Strings.elide(
      Utilities.findFirstHeading(this.state.value),
      88,
      ''
    );

    const descriptionString = Strings.elide(
      Utilities.findFirstParagraph(this.state.value),
      228,
      ''
    );

    let bodyElement = (
      <EntityEditor
        readOnly
        spellCheck
        autoFocus
        value={this.state.value}
        renderEditor={this.renderEditor}
        onChange={this.onChange}
      />
    );

    if (!Strings.isEmpty(this.state.search)) {
      bodyElement = (
        <div className={STYLES_SEARCH_CONTAINER}>
          <div className={STYLES_SEARCH_CONTAINER_RESULTS}>
            <SearchResults
              searchResults={this.state.searchResults}
              posts={this._posts}
              search={this.state.search}
              onClearSearch={this._handleClearSearch}
            />
          </div>
          <GlossaryResults
            language={this.props.language}
            search={this.state.search}
          />
        </div>
      );
    } else {
      if (this.props.post.custom && this.props.post.custom.glossary) {
        bodyElement = (
          <GlossaryResults
            style={{
              width: '100%',
              maxWidth: '768px',
              padding: '12px 24px 0 24px',
              margin: '0 auto 0 auto',
            }}
            language={this.props.language}
            search={this.state.search}
          />
        );
      }
    }

    return (
      <React.Fragment>
        <DocumentHead title={titleString} description={descriptionString} />

        <Navigation
          language={this.props.language}
          getSearchInputRef={this._handleGetSearchInput}
          onChange={this.onInputChange}
          value={this.state.search}
        />
        <div className={STYLES_MAIN_SECTION} id="root">
          <div className={STYLES_BODY}>
            {bodyElement}{' '}
            {Strings.isEmpty(this.state.search) ? (
              <Footer post={this.props.post} />
            ) : null}
          </div>
          <TableOfContents
            library={this.props.library}
            post={this.props.post}
          />
        </div>
        <GlobalTooltips language={this.props.language} />
      </React.Fragment>
    );
  }
}
