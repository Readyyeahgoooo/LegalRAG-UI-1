export interface LegalAuthority {
  name: string;
  description: string;
}

export interface LegalCitation {
  id: number;
  text: string;
  ref: string;
}

export interface LegalAnswer {
  issue: string;
  summary: string;
  authorities: LegalAuthority[];
  citations: LegalCitation[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'root' | 'topic' | 'sub-topic' | 'case';
  x: number;
  y: number;
  parentId?: string;
}
