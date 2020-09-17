import { css } from 'react-emotion';
import * as Constants from '~/common/constants';

const NOTICE_STYLES = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${Constants.colors.neongreen};
  color: ${Constants.colors.black};
`;

export const Notice = ({ children }) => (
  <div className={NOTICE_STYLES}>{children}</div>
);
