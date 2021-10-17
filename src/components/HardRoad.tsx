/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
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

import Toggle from 'react-native-toggle-element';

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
  font-size: ${wp('3.2%')};
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
        <TextCaption weight={400}>가기힘든 길을 표시할까요?</TextCaption>
        <Toggle
          containerStyle={styles.switch}
          trackBarStyle={{
            borderColor: isSwitchOn ? TEXT_DEFAULT : TEXT_DISABLE,
          }}
          trackBar={{
            width: wp('23%'),
            height: hp('6.5%'),
            borderWidth: 6,
            activeBackgroundColor: TEXT_DEFAULT,
            inActiveBackgroundColor: TEXT_DISABLE,
            textAlign: 'center',
          }}
          thumbButton={{
            width: wp('10%'),
            height: wp('10%'),
            activeBackgroundColor: UI_WHITE,
            inActiveBackgroundColor: UI_WHITE,
          }}
          leftComponent={
            isSwitchOn ? (
              <Text style={{color: 'white', fontSize: 13, lineHeight: 20}}>
                ON
              </Text>
            ) : (
              <></>
            )
          }
          rightComponent={
            isSwitchOn ? (
              <></>
            ) : (
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  lineHeight: 20,
                }}>
                OFF
              </Text>
            )
          }
          value={isSwitchOn}
          onPress={onToggleSwitch}
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
  switch: {flex: 1, justifyContent: 'flex-end'},
});
export default HardRoadComponents;
