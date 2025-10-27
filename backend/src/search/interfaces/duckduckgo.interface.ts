export interface DuckDuckGoTopic {
  FirstURL: string;
  Text: string;
  Result: string;
  Icon: {
    URL: string;
    Height: number;
    Width: number;
  };
}

export interface DuckDuckGoResponse {
  Abstract: string;
  AbstractSource: string;
  AbstractText: string;
  AbstractURL: string;
  Answer: string;
  AnswerType: string;
  Definition: string;
  DefinitionSource: string;
  DefinitionURL: string;
  Heading: string;
  Image: string;
  Redirect: string;
  RelatedTopics: DuckDuckGoTopic[];
  Results: DuckDuckGoTopic[];
  Type: string;
  meta: {
    attribution: null;
    blockgroup: null;
    created_date: null;
    description: string;
    designer: null;
    dev_date: null;
    dev_milestone: string;
    developer: string[];
    example_query: string;
    id: string;
    is_stackexchange: null;
    js_callback_name: string;
    maintainer: {
      github: string;
    };
    name: string;
    perl_module: string;
    producer: null;
    production_state: string;
    repo: string;
    signal_from: string;
    src_domain: string;
    src_id: number;
    src_name: string;
    src_options: {
      directory: string;
      is_fanon: number;
      is_mediawiki: number;
      is_wikipedia: number;
      language: string;
      min_abstract_length: string;
      skip_abstract: number;
      skip_abstract_paren: number;
      skip_end: string;
      skip_icon: number;
      skip_image_name: number;
      skip_qr: string;
      source_skip: string;
      src_info: string;
    };
    src_url: null;
    status: string;
    tab: string;
    topic: string[];
    unsafe: number;
  };
}