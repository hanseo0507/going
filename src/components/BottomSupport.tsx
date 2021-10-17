import React from 'react';
import {View, ViewProps, Image} from 'react-native';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from './Button';
import Text from './Text';
import EmojiSmilePNG from '../assets/EmojiSmileIOS.png';
import {TEXT_CAPTION} from '../utils/color';

const SyltedView = styled.View`
  width: ${wp('100%')};
  z-index: 4;
  padding: 25px;
  padding-bottom: 15px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: white;
`;

const TextWrapper = styled.View`
  margin-bottom: ${hp('4%')};
`;

const HeaderWrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const TitleText = styled(Text)`
  font-size: 20;
`;

const DescriptionText = styled(Text)`
  font-size: 13;
  color: ${TEXT_CAPTION};
  margin-top: ${hp('-1%')};
`;

export interface BottomSupportProps extends ViewProps {}

const BottomSupport: React.FC<BottomSupportProps> = ({}) => {
  return (
    <SyltedView>
      <View>
        <TextWrapper>
          <Image
            source={EmojiSmilePNG}
            resizeMode="contain"
            style={{
              width: wp('10%'),
              height: hp('10%'),
              marginTop: hp('-2%'),
              marginBottom: hp('-1.6%'),
            }}
          />
          <TitleText weight={700}>
            기여 시 사용자님의 위치가 공유돼요!
            {'\n'}그래도 괜찮으신가요?
          </TitleText>

          <DescriptionText weight={400}>
            저희 개발팀 고잉은 소중한 사용자님들의 위치 데이터를
            {'\n'}통해 사회적 약자분들에게 가기 힘든 곳을
            {'\n'}안내해주는 데만 사용하다는 점을 약속드려요.
          </DescriptionText>
        </TextWrapper>
      </View>
      <Button label="공유 시작" onPress={() => {}} text={{weight: 700}} />
    </SyltedView>
  );
};

export default BottomSupport;
