import React from 'react';
import {Icon} from 'react-native-eva-icons';
import styled from 'styled-components/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TEXT_DEFAULT} from '../utils/color';
import {ViewProps} from 'react-native';

const StyledButton = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
`;

export interface IconButtonProps extends ViewProps {
  type: 'image' | 'icon';
  iconName?: string;
  color?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  type,
  iconName,
  color,
  children,
  ...props
}) => {
  return (
    <StyledButton style={{elevation: 3}} {...props}>
      {type === 'icon' ? (
        <Icon
          name={iconName}
          width={wp('4.4%')}
          height={hp('4.4%')}
          fill={TEXT_DEFAULT || color}
        />
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default IconButton;
