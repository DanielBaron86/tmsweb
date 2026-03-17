export interface DataServiceConfig {
  getUrl: string;
  queryUrl: string;
}

export default abstract class DataService<T> {
  protected abstract readonly config: DataServiceConfig;

  // ── injections ──────────────────────────────────────────────
  protected readonly http    = inject(HttpClient);
  protected readonly appConfig = inject(ConfigService);
  protected readonly injector  = inject(Injector);

  // ── signals ─────────────────────────────────────────────────
  activePage    = signal(1);
  pageNumber    = signal<number>(1);
  pageSize      = signal<number>(20);
  queryFilters  = signal<QueryFilters | null>(null);
  cachedPages: number[] = [];

  // ── resource (delegated to subclass for URL flexibility) ────
  protected abstract readonly resource: HttpResourceRef<T[] | undefined>;
  
  protected buildResource(config: DataServiceConfig) {
  return httpResource<T[]>(() => {
    const filters    = this.queryFilters();
    const pageNumber = this.pageNumber();
    const pageSize   = this.pageSize();

    return filters
      ? { url: config.queryUrl, method: 'POST', body: filters,
          params: { pageNumber, pageSize } }
      : { url: config.getUrl, method: 'GET',
          params: { pageNumber, pageSize } };
  });
}

  // ── derived state ───────────────────────────────────────────
  cache = linkedSignal({
    source: () => ({
      data:       this.resource.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as T[];
      if (source.data && !this.cachedPages.includes(source.activePage)) {
        this.cachedPages.push(source.activePage);
        return { ...currentList, [source.activePage]: source.data };
      }
      return currentList;
    },
  });

  displayItems = computed(() => {
    const pagedData   = this.cache() as T[][];
    const currentPage = this.activePage();
    return pagedData[currentPage] ?? this.resource.value() ?? [];
  });

  header = computed<PaginationHeader>(() => {
    if (this.resource.status() !== 'resolved') return {};
    return JSON.parse(this.resource.headers()?.get('X-Pagination') ?? '{}');
  });

  // ── actions ─────────────────────────────────────────────────
  refresh() {
    this.cachedPages = [];
    this.queryFilters.set(null);
    this.cache.update(() => []);
    this.activePage.set(1);
    this.pageNumber.set(1);
    this.resource.reload();
  }

  search(newFilters: QueryFilters) {
    this.cachedPages = [];
    this.cache.update(() => []);
    this.queryFilters.set(newFilters);
    this.activePage.set(1);
    this.pageNumber.set(1);
  }

  setActivePage(pageNumber: number, hasFilters = false) {
    if (hasFilters && !this.cachedPages.includes(pageNumber)) {
      this.queryFilters.update(value =>
        value ? { ...value, pageNumber } : value
      );
      this.activePage.set(pageNumber);
    } else {
      this.activePage.set(pageNumber);
    }
    if (!this.cachedPages.includes(pageNumber)) {
      this.pageNumber.set(pageNumber);
    }
  }
}
