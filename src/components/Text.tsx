import styled from 'styled-components/native';

const getFontByFontWeight = (weight: number) => {
  // prettier-ignore
  const list = ['Thin', 'Thin', 'Light','Regular', 'Medium', 'Medium', 'Bold', 'Bold', 'Black'];
  const index = weight / 100 - 1;

  return `NotoSansKR-${list[index]}`;
};

const Text = styled.Text<{weight?: number}>`
  font-family: ${props => getFontByFontWeight(props.weight || 500)};
`;

export default Text;
