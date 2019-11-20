import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "react-emotion";

const STYLES_PREVIEW = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const STYLES_PREVIEW_LEFT = css`
  flex-shrink: 0;
`;

const STYLES_AVATAR = css`
  margin-right: 16px;
  border-radius: 4px;
  height: 48px;
  width: 48px;
  display: inline-flex;
  background-size: cover;
  background-position: 50% 50%;
  background-image: url("/static/avatar.jpg");
`;

const STYLES_PREVIEW_RIGHT = css`
  min-width: 10%;
  width: 100%;
`;

const STYLES_PREVIEW_META = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 600;
  font-size: 0.88rem;
  line-height: 1.5;
  position: relative;
  margin-top: 4px;
`;

const STYLES_PREVIEW_BYLINE = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.5;
  position: relative;
`;

const STYLES_PREVIEW_NAME = css`
  font-weight: 600;
  margin-right: 8px;
`;

const STYLES_PREVIEW_USERNAME = css`
  color: #999;
  margin-right: 8px;
`;

const STYLES_PREVIEW_TIMESTAMP = css`
  margin-right: 8px;
`;

const STYLES_PREVIEW_BODY = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export default (props = { user: {}, post: {} }) => {
  return (
    <div className={STYLES_PREVIEW} style={{ margin: "0 0 48px 0" }}>
      <div className={STYLES_PREVIEW_LEFT}>
        <figure
          className={STYLES_AVATAR}
          style={{ backgroundImage: `url(${props.user.avatarURL})` }}
        />
      </div>
      <div className={STYLES_PREVIEW_RIGHT}>
        <div className={STYLES_PREVIEW_BYLINE}>
          <span className={STYLES_PREVIEW_NAME}>{props.user.name}</span>
          <span className={STYLES_PREVIEW_USERNAME}>
            @{props.user.username}
          </span>
          <span className={STYLES_PREVIEW_TIMESTAMP}>
            {Strings.toDate(props.post.publishedAt)}
          </span>
        </div>
        <div className={STYLES_PREVIEW_BODY}>{props.children}</div>
        <div className={STYLES_PREVIEW_META}>Read "{props.post.title}"</div>
        <div className={STYLES_PREVIEW_META}>{props.post.company}</div>
      </div>
    </div>
  );
};
