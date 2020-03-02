<template>
  <div class="table-container">
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Centro comercial</th>
          <th class="has-text-right" style="width:150px;">S/ Ingresos</th>
          <th class="has-text-right" style="width:200px;">N° Transacciones</th>
          <th style="width:200px;"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="items.length === 0">
          <td colspan="4" class="has-text-centered is-size-5">Cargando ...</td>
        </tr>
        <template v-else v-for="item in items">
          <tr>
            <td>{{item.name}}</td>
            <td class="has-text-right">{{item.num_sales|currency}}</td>
            <td class="has-text-right">{{item.num_transactions|number}}</td>
            <td class="has-text-centered">
              <template v-if="!item.isLoading">
                <a v-if="!item.isOpen" @click="getAllSalesByVenue(item.id)">Ver más detalle</a>
                <a v-else @click="getAllSalesByVenue(item.id)">Cerrar detalle</a>
              </template>
              <template v-else>
                <span class="has-text-grey-light">Cargando ..</span>
              </template>
            </td>
          </tr>
          <tr v-if="item.isOpen && !item.isLoading">
            <td colspan="4">
              <table class="table is-fullwidth is-bordered">
                <thead>
                  <tr>
                    <th style="width:100px;">Año</th>
                    <th>Mes</th>
                    <th class="has-text-right" style="width:150px;">S/ Ingresos</th>
                    <th class="has-text-right" style="width:200px;">N° Transacciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sale in item.sales">
                    <td>{{sale.year}}</td>
                    <td>{{sale.month|toMonth}}</td>
                    <td class="has-text-right">{{sale.num_sales|currency}}</td>
                    <td class="has-text-right">{{sale.num_transactions|number}}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script src="./venues.js"></script>