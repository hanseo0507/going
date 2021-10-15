/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Text from '../components/Text';
import {
  TEXT_CAPTION,
  TEXT_DEFAULT,
  TEXT_DISABLE,
  UI_WHITE,
} from '../utils/color';
import styled from 'styled-components/native';

interface IProps {}

const SyltedView = styled.View`
  top: ${hp('-6%')};
  flex: 1;
  align-items: flex-start;
  background-color: ${UI_WHITE};
`;

const ViewWrapper = styled.View`
  margin-left: ${wp('4%')};
  margin-right: ${wp('4%')};
`;

const TextTilte = styled(Text)`
  padding-top: 10px;
  font-size: ${wp('5%')};
`;

const TextCaption = styled(Text)`
  font-size: ${wp('3.5%')};
  margin-top: ${hp('-2.5%')};
  color: ${TEXT_CAPTION};
`;

const HardRoadComponents: React.FC<IProps> = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState<boolean>(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <SyltedView style={styles.elevation}>
      <ViewWrapper>
        <TextTilte weight={600}>가기힘든 길</TextTilte>
        <TextCaption weight={400}>가기힘든 길을 표시하실래요 ?</TextCaption>
        <Text>{isSwitchOn ? 'Switch is ON' : 'Switch is OFF'}</Text>
        <Switch
          style={styles.switch}
          trackColor={{false: TEXT_DISABLE, true: TEXT_DEFAULT}}
          thumbColor="white"
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
        />
      </ViewWrapper>
    </SyltedView>
  );
};

const styles = StyleSheet.create({
  elevation: {
    elevation: 10,
    shadowColor: '#B8B8B8',
    borderRadius: 15,
  },
  switch: {
    flex: 1,
  },
});
export default HardRoadComponents;
