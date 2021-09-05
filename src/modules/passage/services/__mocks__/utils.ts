import { Passage, PassageType } from '../../entities/passage.entity';

const defaultId = 'ebd7c013-96bc-4978-80f8-064a1b15cea1';

export const mockPassageModel: Passage = {
  id: defaultId,
  name: 'Kelvyn',
  created_at: new Date(),
  lat: 112456.5856,
  lng: 1236413.23255,
  type: PassageType.entry,
  updated_at: new Date(),
};

export const mockAddPassageParams = {
  name: 'Kelvyn',
  type: 'entry',
  lat: 112456.5856,
  lng: 1236413.23255,
};

export const mockUpdatedPassageModel: Passage = {
  id: defaultId,
  name: 'Denis',
  created_at: new Date(),
  lat: 112456.5856,
  lng: 1236413.23255,
  type: PassageType.entry,
  updated_at: new Date(),
};

export const mockPassageMockModelArray = [
  mockPassageModel,
  mockPassageModel,
  mockPassageModel,
];
