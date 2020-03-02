<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Grupo BRECA by Eduardo Rodríguez Patiño</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
  </head>
  <body>

  <section class="section">
    <div class="container">
      <a href="/ventor">
        <img src="public/logo.png" alt="Grupo BRECA" />
      </a>
    </div>
  </section>

  <section id="app"  class="section">
    <div class="container">
      <?php require $path;?>
    </div>
  </section>

  <section class="section">
    <footer class="container">
      <hr>
      <p class="">Examen desarrollado por <b>Eduardo Rodríguez Patiño</b>.</p>
    </footer>
  </section>

  <script src="public/app.js"></script>
  <script>
        // Initialize Components
        window.addEventListener('DOMContentLoaded', () => {
            new Vue({
                el: '#app',
                components: Components
            })
        })
    </script>

  </body>
</html>