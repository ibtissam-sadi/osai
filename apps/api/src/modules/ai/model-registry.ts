export type ModelProvider = 'openai' | 'local' | 'huggingface';
export type ModelMode = 'api' | 'pretrained';

export interface ModelOption {
  id: string;
  name: string;
  provider: ModelProvider;
  mode: ModelMode;
  tasks: Array<'chat' | 'classification' | 'embedding' | 'ocr' | 'summarization' | 'compliance'>;
  enabled: boolean;
}

let activeModelByTask: Record<string, string> = {
  chat: 'openai-gpt-4.1',
  classification: 'hf-xlm-roberta-large',
  embedding: 'openai-text-embedding-3-large',
  ocr: 'local-tesseract-ar-fr-en',
  summarization: 'openai-gpt-4.1-mini',
  compliance: 'hf-legal-bert-multilingual'
};

const modelOptions: ModelOption[] = [
  { id: 'openai-gpt-4.1', name: 'gpt-4.1', provider: 'openai', mode: 'api', tasks: ['chat', 'classification', 'summarization'], enabled: true },
  { id: 'openai-gpt-4.1-mini', name: 'gpt-4.1-mini', provider: 'openai', mode: 'api', tasks: ['summarization', 'classification'], enabled: true },
  { id: 'openai-text-embedding-3-large', name: 'text-embedding-3-large', provider: 'openai', mode: 'api', tasks: ['embedding'], enabled: true },
  { id: 'hf-xlm-roberta-large', name: 'xlm-roberta-large', provider: 'huggingface', mode: 'pretrained', tasks: ['classification', 'compliance'], enabled: true },
  { id: 'hf-legal-bert-multilingual', name: 'legal-bert-multilingual', provider: 'huggingface', mode: 'pretrained', tasks: ['compliance'], enabled: true },
  { id: 'local-tesseract-ar-fr-en', name: 'tesseract-ar-fr-en', provider: 'local', mode: 'pretrained', tasks: ['ocr'], enabled: true }
];

export const listModels = () => modelOptions;
export const getActiveModels = () => activeModelByTask;

export const setActiveModel = (task: string, modelId: string) => {
  const model = modelOptions.find((m) => m.id === modelId && m.enabled);
  if (!model) return null;
  if (!model.tasks.includes(task as any)) return null;
  activeModelByTask = { ...activeModelByTask, [task]: modelId };
  return { task, modelId };
};
