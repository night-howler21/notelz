export type StudyListSummary = {
  id: string;
  name: string;
  topicIds: number[];
};

export type StudyToolsData = {
  savedTopicIds: number[];
  lists: StudyListSummary[];
  annotations: Record<number, string>;
  progress: Record<number, number>;
};

export function emptyStudyTools(): StudyToolsData {
  return { savedTopicIds: [], lists: [], annotations: {}, progress: {} };
}
