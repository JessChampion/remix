import React from 'react';
// @ts-ignore
import { ReactComponent as Alert } from '../Assets/Icons/icon-alert.svg'; // @ts-ignore
import { ReactComponent as Close } from '../Assets/Icons/icon-close.svg'; // @ts-ignore
import { ReactComponent as Edit } from '../Assets/Icons/icon-edit.svg'; // @ts-ignore
import { ReactComponent as Info } from '../Assets/Icons/icon-info.svg'; // @ts-ignore
import { ReactComponent as Left } from '../Assets/Icons/icon-left.svg'; // @ts-ignore
import { ReactComponent as Play } from '../Assets/Icons/icon-play.svg'; // @ts-ignore
import { ReactComponent as Plus } from '../Assets/Icons/icon-plus.svg'; // @ts-ignore
import { ReactComponent as Question } from '../Assets/Icons/icon-question.svg'; // @ts-ignore
import { ReactComponent as Search } from '../Assets/Icons/icon-search.svg'; // @ts-ignore
import { ReactComponent as Spotify } from '../Assets/Icons/icon-spotify.svg'; // @ts-ignore
import { ReactComponent as Up } from '../Assets/Icons/icon-up.svg'; // @ts-ignore
import { ReactComponent as User } from '../Assets/Icons/icon-user.svg';

import './IconComponent.css';

type ValidIconType = 'alert'
  | 'close'
  | 'edit'
  | 'info'
  | 'left'
  | 'right'
  | 'play'
  | 'plus'
  | 'question'
  | 'search'
  | 'spotify'
  | 'up'
  | 'down'
  | 'user';

interface IIconComponentProps {
  type: ValidIconType,
  className?: string
}

interface IIconDefinitionType {
  icon: Function,
  alt: string
}

const ICONS: Map<string, IIconDefinitionType> = new Map<string, IIconDefinitionType>([
  [
    'alert',
    {
      icon: () => <Alert />,
      alt: 'alert'
    }
  ], [
    'close',
    {
      icon: () => <Close />,
      alt: 'close'
    }
  ], [
    'edit',
    {
      icon: () => <Edit />,
      alt: 'edit'
    }
  ], [
    'info',
    {
      icon: () => <Info />,
      alt: 'info'
    }
  ], [
    'left',
    {
      icon: () => <Left />,
      alt: 'left'
    }
  ], [
    'right',
    {
      icon: () => <Left className="flip" />,
      alt: 'right'
    }
  ], [
    'play',
    {
      icon: () => <Play />,
      alt: 'play'
    }
  ], [
    'plus',
    {
      icon: () => <Plus />,
      alt: 'plus'
    }
  ], [
    'question',
    {
      icon: () => <Question />,
      alt: 'question'
    }
  ], [
    'search',
    {
      icon: () => <Search />,
      alt: 'search'
    }
  ], [
    'spotify',
    {
      icon: () => <Spotify />,
      alt: 'spotify logo'
    }
  ], [
    'up',
    {
      icon: () => <Up />,
      alt: 'up'
    }
  ], [
    'down',
    {
      icon: () => <Up className="flip" />,
      alt: 'down'
    }
  ], [
    'user',
    {
      icon: () => <User />,
      alt: 'user'
    }
  ]
]);

function IconComponent({ type, className }: IIconComponentProps) {
  const icon = ICONS.get(type);
  if (!icon) {
    return null;
  }
  return (
    <span
      className={`icon ${className}`}
      title={icon.alt}
      aria-label={icon.alt}
    >
      {icon.icon()}
    </span>
  );
}

IconComponent.defaultProps = {
  className: ''
};

export default IconComponent;
