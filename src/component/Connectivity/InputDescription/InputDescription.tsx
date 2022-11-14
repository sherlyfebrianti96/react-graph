import styled from "@emotion/styled";

export const InputDescription = () => {
  return (
    <CustomInputDescription>
      Here is tips for you to build your graphs :
      <CustomUl>
        <CustomLi>Alphabetical (A to Z) as the graph's Node.</CustomLi>
        <CustomLi>Dash (-) as the graph's Edge.</CustomLi>
        <CustomLi>Comma (,) or New Line (↩) as separation between path.</CustomLi>
      </CustomUl>
    </CustomInputDescription>
  );
};

const CustomInputDescription = styled.div`
  padding: 1.5em 0.8em;
`;

const CustomUl = styled.ul`
  padding-left: 2em;
  margin-bottom: 0;
`;

const CustomLi = styled.li`
  margin-bottom: 0.8em;

  &:last-child {
    margin-bottom: 0;
  }
`;
