import React, { CSSProperties, ClassicElement, Fragment } from 'react';
import { Link } from 'react-router-dom';

import OnClickDropdown from 'components/OnClickDropdown';
import './LinkDropdown.scss';

type Props = {
  children: ClassicElement<any>;
  dropdownContent: Array<{
    url: string;
    value?: string | number;
    label: string | ClassicElement<any>;
    insertSectionDivider?: boolean;
    target?: string;
  }>;
  className?: string;
  style?: CSSProperties;
  dropdownElementsWidth?: any;
  dropdownContentHeight?: string | number;
  dropdownContentPositioning?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  dropdownArrow?: boolean;
  onVisibleChange?: Function;
};

const LinkDropdown = ({
  children,
  dropdownContent,
  className,
  style,
  dropdownElementsWidth,
  dropdownContentHeight,
  dropdownContentPositioning,
  dropdownArrow = false,
  onVisibleChange = () => { },
}: Props) => (
  <OnClickDropdown
    dropdownContent={() => {
      return (
        <div>
          {
            dropdownContent.map((element: any) => (
              <Fragment key={element.url}>
                <Link
                  to={element.url}
                  key={element.url}
                  target={element.target}
                >
                  <div>{element.label}</div>
                </Link>
                <div
                  style={{ borderBottom: element.insertSectionDivider ? '2px solid #DEDEDE' : 'none' }}
                />
              </Fragment>
            ))
          }
        </div>
      );
    }}
    className={`link-dropdown ${className}`}
    style={style}
    dropdownElementsWidth={dropdownElementsWidth}
    dropdownContentHeight={dropdownContentHeight}
    dropdownContentPositioning={dropdownContentPositioning}
    dropdownArrow={dropdownArrow}
    onVisibleChange={onVisibleChange}
  >
    {children}
  </OnClickDropdown>
);

export default LinkDropdown;
