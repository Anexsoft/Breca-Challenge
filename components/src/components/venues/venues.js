export default {
  name: "venues",
  data() {
    return {
      items: []
    }
  },
  methods: {
    getAllVenues() {
      let self = this;
      self.$proxies.reportProxy.venues().then(x => {
        let data = x.data;

        data.forEach(item => self.items.push({
          id: parseInt(item.id),
          name: item.name,
          num_sales: parseFloat(item.num_sales),
          num_transactions: parseInt(item.num_transactions),
          isOpen: false,
          isLoading: false,
          sales: [],
        }));
      }).catch(() => {
        console.error('Ocurrió un error inesperado.');
      });
    },
    getAllSalesByVenue(id) {
      let self = this,
        venue = self.items.find(x => x.id === id);

      if (!venue.isOpen) {
        if (!venue.sales.length) {
          venue.isLoading = true;

          self.$proxies.reportProxy.sales(id).then(x => {
            let data = x.data;

            venue.isLoading = false;
            venue.sales = data;
            venue.isOpen = true;
          }).catch(() => {
            console.error('Ocurrió un error inesperado.');
          });
        } else {
          venue.isOpen = true;
        }
      } else {
        venue.isOpen = false;
      }
    }
  },
  created() {
    this.getAllVenues();
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