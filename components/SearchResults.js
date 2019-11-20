import { P, H2 } from "~/components/Text";

import { css } from "react-emotion";

const STYLES_ITEM = css`
  max-width: 768px;
  width: 100%;
  margin: 0 auto 0 auto;
  padding: 0 24px 32px 24px;
`;

const STYLES_ACTION = css`
  display: block;
  margin-top: 12px;
  color: blue;
  font-weight: 600;
  font-size: 12px;
  text-decoration: none;
`;

export default props => {
  return (
    <div>
      {props.searchResults.map(p => {
        const post = props.posts[p.result.id];
        if (p.type === "POST") {
          return (
            <div className={STYLES_ITEM} key={`result-${p.result.id}`}>
              <H2 style={{ padding: 0 }}>{p.post.title}</H2>
              <a href={`/${post.slug}`} className={STYLES_ACTION}>
                Read this post
              </a>
            </div>
          );
        }

        return (
          <div className={STYLES_ITEM} key={`result-${p.result.id}`}>
            <P style={{ padding: 0 }}>“{p.post.text}”</P>
            <a href={`/${post.slug}`} className={STYLES_ACTION}>
              Read: {p.post.title}
            </a>
          </div>
        );
      })}
    </div>
  );
};
