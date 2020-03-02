<template>
  <div >
    <div
      v-if="isLoading"
      class="has-text-centered is-size-5"
    >-- Estamos cargando el dashboard, espero un momento por favor --</div>

    <template v-else>
      <div class="box">
        <div class="select is-fullwidth is-large">
          <select v-model.number="year">
            <option :value="2019">2019</option>
            <option :value="2020">2020</option>
          </select>
        </div>
      </div>

      <h4 class="title">Reporte de Visitantes</h4>
      <h5 class="subtitle">Información relevante sobre los visitantes.</h5>

      <div class="columns">
        <div class="column">
          <div class="box">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Centro comercial</th>
                  <th class="has-text-right">Visitantes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filterByYear(dashboard.visits)">
                  <td class="has-text-weight-bold">{{item.name}}</td>
                  <td class="has-text-right">{{item.total|number}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="column">
          <div class="box">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Sexo</th>
                  <th class="has-text-right">Visitantes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filterByYear(dashboard.visitsPerGender)">
                  <td class="has-text-weight-bold">
                    <span v-if="item.gender.toLowerCase() === 'm'">Hombre</span>
                    <span v-if="item.gender.toLowerCase() === 'f'">Mujer</span>
                    <span v-if="item.gender.toLowerCase() === 'other'">Otros</span>
                  </td>
                  <td class="has-text-right">{{item.total|number}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="column">
          <div class="box">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Generación</th>
                  <th class="has-text-right">Visitantes</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in filterByYear(dashboard.visitsPerGeneration)">
                  <tr>
                    <td class="has-text-weight-bold">Baby Boomer</td>
                    <td class="has-text-right">{{item.babyboomer|number}}</td>
                  </tr>
                  <tr>
                    <td class="has-text-weight-bold">Generación X</td>
                    <td class="has-text-right">{{item.generationx|number}}</td>
                  </tr>
                  <tr>
                    <td class="has-text-weight-bold">Generación Y</td>
                    <td class="has-text-right">{{item.generationy|number}}</td>
                  </tr>
                  <tr>
                    <td class="has-text-weight-bold">Generación Z</td>
                    <td class="has-text-right">{{item.generationz|number}}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h4 class="title">Reporte de Ingresos</h4>
      <h5 class="subtitle">Ingresos percibidos durante el año de los centros comerciales.</h5>

      <div class="columns">
        <div class="column">
          <div class="box">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th class="has-text-right">Ingreso (S/)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filterByYear(dashboard.salesPerYear)">
                  <td class="has-text-weight-bold">{{item.month|toMonth}}</td>
                  <td class="has-text-right">{{item.num_sales|currency}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script src="./dashboard.js"></script>