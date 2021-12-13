import styled from 'styled-components';

export const EventDetailHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2em;
  width: 100%;
`;

export const EventDetailHeaderTitle = styled.div`
  flex: 1;
  overflow: hidden;

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const EventDetailHeaderAction = styled.div`
  display: flex;
`;

export const EventDetailContent = styled.div``;
export const EventDetailContentList = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6em 0;
`;
