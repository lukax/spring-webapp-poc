module core {
  export interface Page {
    index: number;
    size: number;
  }

  export interface PageHeader{
    page_index: number;
    page_size: number;
  }
}
