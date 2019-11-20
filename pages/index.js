import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as Utilities from "~/common/utilities";

import { H1, H2, BODY } from "~/components/Text";
import { Button } from "~/components/Form";
import { css } from "react-emotion";
import { Value } from "slate";

import MiniSearch from "minisearch";
import Head from "next/head";
import Library from "~/common/temporary-library";
import PostPreview from "~/components/PostPreview";
import EntityEditor from "~/components-editor/EntityEditor";
import EntityEditorHoverMenu from "~/components-editor/EntityEditorHoverMenu";
import SearchResults from "~/components/SearchResults";

const STYLES_TOP = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const STYLES_TITLE_BAR = css`
  height: 32px;
  width: 100%;
  color: #fff;
  background: #000;
  padding: 0 24px 0 24px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const STYLES_SEARCH = css``;

const STYLES_SEARCH_INPUT = css`
  height: 48px;
  margin: 0;
  border: 0;
  outline: 0;
  font-size: 24px;
  color: #fff;
  padding: 0 24px 0 24px;
  width: 100%;
  background-color: #000;

  :focus {
    border: 0;
    outline: 0;
  }
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
  padding: 152px 0 128px 388px;
  background: ${Constants.colors.white};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 144px 0 24px 0;
  }
`;

const STYLES_TABLE_OF_CONTENTS = css`
  background: ${Constants.colors.gray};
  z-index: ${Constants.zindex.sidebar};
  position: fixed;
  top: 80px;
  left: 0;
  bottom: 0;
  width: 388px;

  @media (max-width: 768px) {
    position: relative;
  }
`;

const STYLES_SIDEBAR = css`
  padding: 80px 24px 24px 24px;
`;

const STYLES_DOCUMENT_ITEM = css`
  display: block;
  font-size: 20px;
  margin-bottom: 16px;
  color: #000;
  text-decoration: none;
  font-weight: 600;

  :visited {
    color: #000;
  }

  :hover {
    color: #000;
  }
`;

export default class IndexPage extends React.Component {
  _search = null;
  _posts = {};

  static getInitialProps(ctx) {
    let post = Library.posts[0];
    for (let i = 0; i < Library.posts.length; i++) {
      if (Library.posts[i].slug === ctx.req.params.slug) {
        post = Library.posts[i];
      }
    }

    return {
      post,
      library: Library
    };
  }

  _menu;

  state = {
    value: Value.fromJSON(Strings.parseMD(this.props.post.value)),
    search: "",
    searchResults: []
  };

  componentWillUnmount() {
    this._search = null;
    this._posts = null;
  }

  componentDidMount() {
    this._search = new MiniSearch({
      fields: ["title", "text"],
      searchOptions: {
        boost: { title: 3 }
      }
    });

    const documents = [];
    this._posts = {};

    let id = 0;

    if (!this.props.library) {
      return;
    }

    // NOTE(jim): This method loads documents into search.
    this.props.library.posts.forEach(post => {
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
        this._posts[id] = { ...post, text: node.text };
        documents.push({ id, text: node.text });
      });

      id = id + 1;
      this._posts[id] = { ...post };
      documents.push({ id, title: post.title });
    });

    this._search.addAll(documents);
  }

  _setMenuReference = ref => {
    this._menu = ref;
  };

  onInputChange = ({ target }) => {
    const results = this._search.search(target.value);
    const searchResults = [];

    let total = 0;
    for (let i = 0; i < results.length; i++) {
      if (total > 99) {
        break;
      }

      let result = results[i];

      if (this._posts[result.id]) {
        total += 1;
        let post = this._posts[result.id];
        let type = post.text ? "PARAGRAPH" : "POST";

        searchResults.push({
          type,
          post,
          result: { id: result.id }
        });
      }
    }

    return this.setState({
      search: target.value,
      searchResults
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

    if (isBlurred || isCollapsed || fragment.text === "") {
      menu.removeAttribute("style");
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    menu.style.visibility = "visible";

    menu.style.opacity = 1;

    const nextTop = rect.top + window.pageYOffset - menu.offsetHeight;
    menu.style.top = `${nextTop}px`;

    const nextLeft =
      rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2;
    menu.style.left = nextLeft >= 24 ? `${nextLeft}px` : `24px`;
  };

  renderEditor = (props, editor, next) => {
    const children = next();

    return (
      <React.Fragment>
        {children}
        <EntityEditorHoverMenu
          onSetMenuReference={this._setMenuReference}
          editor={editor}
        />
      </React.Fragment>
    );
  };

  render() {
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
        <SearchResults
          searchResults={this.state.searchResults}
          posts={this._posts}
          search={this.state.search}
        />
      );
    }

    return (
      <React.Fragment>
        <Head>
          <title>Lotus Documentation Preview</title>
        </Head>

        <div className={STYLES_TOP}>
          <div className={STYLES_TITLE_BAR}>
            Lotus Documentation Concept 0.1
          </div>
          <div className={STYLES_SEARCH}>
            <input
              className={STYLES_SEARCH_INPUT}
              onChange={this.onInputChange}
              value={this.state.search}
              placeholder="Type here to search lotus documentation..."
            />
          </div>
        </div>
        <div className={STYLES_MAIN_SECTION} id="root">
          <div className={STYLES_TABLE_OF_CONTENTS}>
            <div className={STYLES_SIDEBAR}>
              {this.props.library.posts.map(p => {
                return (
                  <a
                    className={STYLES_DOCUMENT_ITEM}
                    href={`/${p.slug}`}
                    key={`post-${p}.id-${p.slug}`}
                  >
                    {p.title}
                  </a>
                );
              })}
            </div>
          </div>
          <div className={STYLES_BODY}>{bodyElement}</div>
        </div>
      </React.Fragment>
    );
  }
}
