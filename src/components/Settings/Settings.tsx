import React, { FC, useState } from 'react';
import LinkDropdown from 'components/LinkDropdown';

import { ReactComponent as ProfileIcon } from 'assets/icons/profile.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg';

import './Settings.scss';
// import { useSelector } from 'react-redux';

type Props = {
  userType?: string;
  fromSubmitSuccessful?: boolean;
  fromFormSubmission?: boolean;
};

const Settings: FC<Props> = (props: Props) => {
  const [isClicked, setClicked] = useState(false);
  // const user = useSelector((state: any) => state.get('user'))?.toJS();
  const user = {
    picture: '',
    name: 'Test',
    email: 'test@gmail.com'
  };

  function onVisibleChange(isVisible: boolean) {
    setClicked(isVisible);
  }

  const settingsItems = [];

  if (user) {
    const uiAvatarImage = user?.picture?.length
      ? user.picture
      : encodeURI(
        `https://ui-avatars.com/api/?name=${user?.name}&color=ff0000`,
      );
    settingsItems.push({
      url: '',
      target: '',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <img
            src={uiAvatarImage}
            style={{ width: 30, height: 30, borderRadius: 20 }}
            alt="uiAvatarImage"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 12,
              marginLeft: 10,
              overflowWrap: 'anywhere',
            }}
          >
            <b>{user?.name}</b>
            <i>{user?.email}</i>
          </div>
        </div>
      ),
      insertSectionDivider: true,
    });
  }

  settingsItems.push({
    url: '/logout',
    label: (
      <span style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: '192px',
      }}
      >
        <LogoutIcon />
        Logout
      </span>
    ),
  });

  return (
    <div className="settings">
      <LinkDropdown
        dropdownContent={settingsItems}
        className={`link-dropdown ${isClicked ? 'clicked' : ''}`}
        dropdownContentPositioning={{ right: -10 }}
        onVisibleChange={onVisibleChange}
      >
        <ProfileIcon style={{ height: 30, width: 30 }} />
      </LinkDropdown>
    </div>
  );
};

export default Settings;
