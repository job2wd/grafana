import React, { useContext } from 'react';
import { css, cx } from 'emotion';
import { ThemeContext, Icon, Input } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { SearchQuery } from 'app/core/components/search/search';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  query: SearchQuery;
  onChange: (query: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  width?: number;
}

const getSearchFieldStyles = (theme: GrafanaTheme) => ({
  wrapper: css`
    width: 100%;
    height: 55px; /* this variable is not part of GrafanaTheme yet*/
    display: flex;
    background-color: ${theme.colors.panelBg};
    border-bottom: 1px solid ${theme.colors.panelBorder};
    position: relative;
    align-items: center;
  `,
  input: css`
    max-width: 683px;
    padding-left: ${theme.spacing.md};
    margin-right: 90px;
    box-sizing: border-box;
    outline: none;
    background-color: ${theme.colors.panelBg};
    background: ${theme.colors.panelBg};
    flex-grow: 10;
  `,
  spacer: css`
    flex-grow: 1;
  `,
  icon: cx(
    css`
      color: ${theme.colors.textWeak};
      padding: 0 ${theme.spacing.md};
    `
  ),
  clearButton: css`
    font-size: ${theme.typography.size.sm};
    color: ${theme.colors.textWeak};
    text-decoration: underline;
  `,
});

export const SearchField: React.FunctionComponent<SearchFieldProps> = ({ query, onChange, size, ...inputProps }) => {
  const theme = useContext(ThemeContext);
  const styles = getSearchFieldStyles(theme);

  return (
    <>
      {/* search-field-wrapper class name left on purpose until we migrate entire search to React */}
      {/* based on it GrafanaCtrl (L256) decides whether or not hide search */}
      <div className={`${styles.wrapper} search-field-wrapper`}>
        <Input
          type="text"
          placeholder="Search dashboards by name"
          value={query.query}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.currentTarget.value);
          }}
          tabIndex={1}
          spellCheck={false}
          className={styles.input}
          prefix={<Icon name="search" />}
          suffix={
            <a className={styles.clearButton} onClick={() => onChange('')}>
              Clear
            </a>
          }
          {...inputProps}
        />

        <div className={styles.spacer} />
      </div>
    </>
  );
};
