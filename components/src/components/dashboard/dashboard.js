export default {
  name: "dashboard",
  data() {
    return {
      year: 2020,
      isLoading: false,
      cache: {
        key: 'dashboard',
        minutes: 10
      }
    };
  },
  methods: {
    getDashboard() {
      let self = this;
      self.isLoading = true;

      let data = self.$helpers.cache.get(self.cache.key);;

      if (!data) {
        self.$proxies.reportProxy.dashboard().then(x => {
          let data = x.data;

          self.isLoading = false;
          self.dashboard = data;
          self.$helpers.cache.add(self.cache.key, data, self.cache.minutes)
        }).catch(() => {
          console.error('Ocurrió un error inesperado.');
        });
      } else {
        self.isLoading = false;
        self.dashboard = data;
      }
    },
    filterByYear(data) {
      if (!data) return [];

      return data.filter(x => parseInt(x.year) === this.year);
    }
  },
  created() {
    this.getDashboard();
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(value);
    },
    number(value) {
      return new Intl.NumberFormat('es-PE').format(value);
    },
    toMonth(value) {
      if (value == 1) return 'Enero';
      if (value == 2) return 'Febrero';
      if (value == 3) return 'Marzo';
      if (value == 4) return 'Abril';
      if (value == 5) return 'Mayo';
      if (value == 6) return 'Junio';
      if (value == 7) return 'Julio';
      if (value == 8) return 'Agosto';
      if (value == 9) return 'Setiembre';
      if (value == 10) return 'Octubre';
      if (value == 11) return 'Noviembre';
      if (value == 12) return 'Diciembre';

      return '--';
    }
  }
};