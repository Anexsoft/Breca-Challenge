<template>
  <div>
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

      <div class="table-container box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Día de la semana</th>
              <th class="has-text-centered" style="width:130px;">Madrugada</th>
              <th class="has-text-centered" style="width:130px;">Mañana</th>
              <th class="has-text-centered" style="width:130px;">Tarde</th>
              <th class="has-text-centered" style="width:130px;">Noche</th>
              <th class="has-text-right" style="width:100px;">Total</th>
            </tr>
            <tr>
              <th></th>
              <th class="has-text-centered has-text-weight-light">12am a 5am</th>
              <th class="has-text-centered has-text-weight-light">6am a 11am</th>
              <th class="has-text-centered has-text-weight-light">12pm a 6pm</th>
              <th class="has-text-centered has-text-weight-light">7pm a 11pm</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filterByYear(dashboard.salesPerWeek)">
              <td>{{item.dayofweek|toDayOfweek}}</td>
              <td>
                <progress
                  :title="item.dawning + ' visitantes'"
                  style="margin-top:5px;"
                  class="progress is-info"
                  :value="item.dawning / item.total * 100"
                  max="100"
                ></progress>
              </td>
              <td>
                <progress
                  :title="item.morning + ' visitantes'"
                  style="margin-top:5px;"
                  class="progress is-primary"
                  :value="item.morning / item.total * 100"
                  max="100"
                ></progress>
              </td>
              <td>
                <progress
                  :title="item.afternoon + ' visitantes'"
                  style="margin-top:5px;"
                  class="progress is-danger"
                  :value="item.afternoon / item.total * 100"
                  max="100"
                ></progress>
              </td>
              <td>
                <progress
                  :title="item.night + ' visitantes'"
                  style="margin-top:5px;"
                  class="progress is-black"
                  :value="item.night / item.total * 100"
                  max="100"
                ></progress>
              </td>
              <td class="has-text-right">{{item.total|number}}</td>
            </tr>
          </tbody>
        </table>
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
                  <th style="width:200px;" class="has-text-right">Ingreso (S/)</th>
                  <th style="width:200px;" class="has-text-right">Transacciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filterByYear(dashboard.salesPerYear)">
                  <td class="has-text-weight-bold">{{item.month|toMonth}}</td>
                  <td class="has-text-right">{{item.num_sales|currency}}</td>
                  <td class="has-text-right">{{item.num_transactions|money}}</td>
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