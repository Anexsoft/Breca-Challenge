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

          addExtraInformation(data);

          function addExtraInformation() {
            data.salesPerWeek.forEach(x => {
              x.dawning = parseInt(x.dawning);
              x.morning = parseInt(x.morning);
              x.afternoon = parseInt(x.afternoon);
              x.night = parseInt(x.night);

              x.total = x.dawning + x.morning + x.afternoon + x.night;
            })
          }

          self.$helpers.cache.add(self.cache.key, data, self.cache.minutes);
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
    },
    toDayOfweek(value) {
      if (value == 1) return 'Lunes';
      if (value == 2) return 'Martes';
      if (value == 3) return 'Miércoles';
      if (value == 4) return 'Jueves';
      if (value == 5) return 'Viernes';
      if (value == 6) return 'Sábado';
      if (value == 7) return 'Domingo';

      return '--';
    }
  }
};