import React, { CSSProperties, useEffect } from 'react';

import useComponentVisible from 'utils/hooks/useComponentVisible';
import './OnClickDropdown.scss';

type Props = {
  children: React.ClassicElement<any>;
  dropdownContent: any;
  className?: string;
  inputStyle?: CSSProperties;
  dropDownStyle?: CSSProperties;
  dropdownElementsWidth?: any;
  style?: CSSProperties;
  dropdownContentHeight?: string | number
  dropdownContentPositioning?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  dropdownArrow?: boolean;
  disabled?: boolean;
  onVisibleChange?: Function;
};

const OnClickDropdown = ({
  children,
  dropdownContent,
  className = '',
  inputStyle,
  dropdownElementsWidth,
  dropDownStyle,
  disabled = false,
  onVisibleChange = () => { },
}: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const toggleDropdown = () => !disabled && setIsComponentVisible(!isComponentVisible);

  useEffect(() => {
    onVisibleChange(isComponentVisible);
  // eslint-disable-next-line
  }, [isComponentVisible]);

  return (
    <div className={`on-click-dropdown ${className}`} style={inputStyle}>
      <div className="dropdown-container">
        <div className="full-content" ref={ref}>
          <div onClick={toggleDropdown} role="button">
            {children}
          </div>
          {isComponentVisible && (
            <div
              className="dropdown-content"
              style={{
                minWidth: dropdownElementsWidth,
                display: `${!isComponentVisible ? 'none' : 'block'}`,
                ...dropDownStyle,
              }}
            >
              {dropdownContent(toggleDropdown)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnClickDropdown;
