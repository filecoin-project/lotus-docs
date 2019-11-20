import { css } from 'react-emotion';

import * as React from 'react';
import * as Constants from '~/common/constants';
import * as Strings from '~/common/strings';
import * as SVG from '~/components/SVG';

import GlossaryEnglish from '~/glossary/glossary-english';
import GlossaryChinese from '~/glossary/glossary-chinese';
import RectBoundary from '~/components/RectBoundary';

const delay = async waitMs => {
  return await new Promise(resolve => setTimeout(resolve, waitMs));
};

const STYLES_ANCHOR = css`
  z-index: ${Constants.zindex.toast};
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;
`;

const STYLES_TOAST_CONTAINER = css`
  position: fixed;
  user-select: none;
  top: 72px;
  max-width: 268px;
  width: 100%;
  z-index: ${Constants.zindex.toast};
`;

const STYLES_TOAST = css`
  border-top: 1px solid #ffd91a;
  background: #ffd500;
  color: #000;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  user-select: none;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 16px;
  transition: 200ms ease all;
  animation: 300ms ease fadeInLeft;
  padding: 16px;

  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(-24px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const STYLES_TOAST_BODY = css`
  font-size: 16px;
  line-height: 1.5;
  margin-top: 16px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_TOAST_HEADER = css`
  font-family: 'medium';
  font-size: 16px;
  line-height: 1.5;
  display: block;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_TOAST_TOP = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  cursor: pointer;
`;

class Toast extends React.Component {
  render() {
    return (
      <RectBoundary
        className={STYLES_TOAST}
        captureScroll={false}
        enabled
        onOutsideRectEvent={this.props.onDismiss}
      >
        <div className={STYLES_TOAST_TOP} onClick={this.props.onDismiss}>
          <SVG.Close height="24px" />
        </div>
        <div className={STYLES_TOAST_HEADER}>{this.props.toast.title}</div>
        <div className={STYLES_TOAST_BODY}>{this.props.children}</div>
      </RectBoundary>
    );
  }
}

export default class GlobalTooltips extends React.Component {
  state = {
    tooltips: [],
  };

  componentDidMount() {
    window.addEventListener('add-tooltip', this._handleAdd);
  }

  compoenntWillUnmount() {
    window.removeEventListener('add-tooltip', this._handleAdd);
  }

  _handleAdd = e => {
    let glossary = GlossaryEnglish;
    if (this.props.langauge === 'cn') {
      glossary = GlossaryChinese;
    }

    const { tooltips } = this.state;

    let next = {
      id: `tooltip-${new Date()}-${tooltips.length}`,
      title: 'Unknown Term',
      value: 'This term has not been defined yet. We will explain it soon!',
    };

    let slug = Strings.createSlug(e.detail);
    let entry = glossary[slug];

    if (entry) {
      next = {
        id: next.id,
        title: entry.title,
        value: entry.value,
      };
    }

    if (tooltips.length && next.title === tooltips[0].title) {
      return;
    }

    this.setState({ tooltips: [next] });
  };

  _handleDismiss = id => {
    const tooltips = this.state.tooltips.filter(t => t.id !== id);

    this.setState({ tooltips });
  };

  render() {
    return (
      <div className={STYLES_ANCHOR}>
        <div className={STYLES_TOAST_CONTAINER}>
          {this.state.tooltips.map(t => {
            return (
              <Toast
                key={t.id}
                toast={t}
                onDismiss={() => this._handleDismiss(t.id)}
              >
                {t.value}
              </Toast>
            );
          })}
        </div>
      </div>
    );
  }
}
