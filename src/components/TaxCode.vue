<template>
<main role="main" class="inner cover">
  <div class="tax-code-card">
    <div class="header-card"></div>
    <div class="content-card">
      <form id="taxCodeForm" @submit.prevent="checkForm">

        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="(error, index) in errors" :key="`error-${index}`">{{ error }}</li>
          </ul>
        </p>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="taxCode">CODICE FISCALE</label>
          <div class="col-sm-10">
            <input v-model="taxCodeOut" type="text" class="form-control" id="taxCode" placeholder="Codice Fiscale" disabled>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="surname">COGNOME</label>
          <div class="col-sm-10">
            <input v-model="surname" v-bind:class="{error: isSurError}" type="text" class="form-control" id="surname" placeholder="Cognome" @input="forceUpperCase('surname')">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="name">NOME</label>
          <div class="col-sm-6">
            <input v-model="name" v-bind:class="{error: isNameError}" type="text" class="form-control" id="name" placeholder="Nome" @input="forceUpperCase('name')">
          </div>
          <label class="col-sm-2 col-form-label" for="sex">SESSO</label>
          <div class="col-sm-2">
            <select v-model="sex" id="sex" class="form-control">
              <option selected>M</option>
              <option>F</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="birthPlace">LUOGO DI NASCITA</label>

          <div class="col-sm-10">
            <vue-instant
            v-model="birthPlace"
            v-bind:class="{error: isBirthPlaceError}"
            :suggestion-attribute="suggestionAttribute"
            :disabled="false"
            :suggestions="districts"
            id="birthPlace"
            :show-autocomplete="true"
            :autofocus="false"
            @enter="chosenDistrict"
            @key-right="chosenDistrict"
            @selected="selected"
            placeholder="Luogo di Nascita"
            type="google">
            </vue-instant>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="district">PROVINCIA</label>
          <div class="col-md-3">
            <input v-model="district" type="text" class="form-control" id="district" placeholder="Provincia" disabled>
          </div>
          <label class="col-sm-2 col-form-label" for="BirthData">DATA DI NASCITA</label>
          <div class="col-md-5">
            <datepicker v-model="birthDate" name="birthPlace" class="form-control" v-bind:class="{error: isBirthDateError}" id="BirthDate"></datepicker>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</main>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { regex } from '../handlers';
import tcGenerator from '../tcGenerator';

export default {
  name: 'TaxCode',
  data() {
    return {
      isSurError: false,
      isNameError: false,
      isBirthDateError: false,
      isBirthPlaceError: false,
      errors: [],
      taxCodeOut: '',
      surname: '',
      name: '',
      birthPlace: '',
      sex: 'M',
      district: '',
      birthDate: '',
      districts: [],
      suggestionAttribute: 'district',
      object: {},
      cadastralCode: ''
    };
  },

  methods: {
    selected: function(obj) {
      this.object = obj;
    },
    chosenDistrict: function() {
      var birthPlaceArr = this.birthPlace.split('(');
      this.cadastralCode = this.object.codCat;
      this.district = birthPlaceArr[1].slice(0, -1);
    },
    checkName: function() {
      const foundErr = this.name.match(regex);
      this.errors = [];
      if (!this.name) {
        return this.isNameError = true;
      }
      if (foundErr) {
        console.log('AAAA ERRORE NOME');
        this.errors.push('Not a valid name!');
        console.log('--->', this.errors);
        return this.isNameError = true;
      }
      return this.isNameError = false;
    },

    checkSurname: function() {
      const foundErr = this.surname.match(regex);
      this.errors = [];
      if (!this.surname) {
        return this.isSurError = true;
      }
      if (foundErr) {
        console.log('BBBB ERRORE COGNOME');
        this.errors.push('Not a valid surname!');
        console.log('--->', this.errors);
        return this.isSurError = true;
      }
      return this.isSurError = false;
    },

    checkDate: function() {
      this.errors = [];
      if (!this.birthDate) {
        return this.isBirthDateError = true;
      }
      return this.isBirthDateError = false;
    },

    checkBirthPlace: function() {
      this.errors = [];
      if (!this.birthPlace) {
        return this.isBirthPlaceError = true;
      }
      return this.isBirthPlaceError = false;
    },

    checkForm: function() {
      var checkName = this.checkName();
      var checkSurname = this.checkSurname();
      var checkDate = this.checkDate();
      var checkBirthPlace = this.checkBirthPlace();

      if (!checkName && !checkSurname && !checkDate && !checkBirthPlace) {
        this.createTaxCode();
      }
    },

    createTaxCode: function() {
      this.taxCodeOut = tcGenerator(
        this.surname,
        this.name,
        this.birthDate,
        this.sex,
        this.cadastralCode
      );
    },

    loadDistrict: function(callback) {
      const endpointUrl = 'https://query.wikidata.org/sparql';
      const sparqlQuery =
        `SELECT DISTINCT ?comune_it ?label ?codcat ?codice_immatricolazione WHERE {
            ?comune_it wdt:P31 wd:Q747074.
            ?comune_it rdfs:label ?label.
            OPTIONAL { ?comune_it wdt:P806 ?codcat. }
            FILTER(LANGMATCHES(LANG(?label), "it"))
            OPTIONAL { ?comune_it wdt:P395 ?codice_immatricolazione. }
          }`;
      const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
      const headers = {
        'Accept': 'application/sparql-results+json'
      };

      fetch(fullUrl, {
        headers
      }).then(body => {
        return body.json();
      }).then(json => {
        if (json) {
          if (json.results.bindings.length > 0) {
            for (var i = 0; i < json.results.bindings.length; i++) {
              if (json.results.bindings[i].codcat !== undefined) {
                if (json.results.bindings[i].codice_immatricolazione === undefined) {
                  this.districts.push({
                    district: `${json.results.bindings[i].label.value} (XX)`, // json.results.bindings[i].label.value,
                    codImm: 'XX',
                    codCat: json.results.bindings[i].codcat.value
                  });
                } else {
                  this.districts.push({
                    district: `${json.results.bindings[i].label.value} (${json.results.bindings[i].codice_immatricolazione.value})`, // json.results.bindings[i].label.value
                    codImm: json.results.bindings[i].codice_immatricolazione.value,
                    codCat: json.results.bindings[i].codcat.value
                  });
                }
              }
            }
          }
        }
      });
    },
    forceUpperCase(prop) {
      this[prop] = this[prop].toUpperCase();
    }
  },
  beforeMount() {
    this.loadDistrict();
  },
  components: {
    Datepicker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.error {
  border: 1px solid red;
}

.cover {
  padding: 0 1.5rem;
}

.cover .btn-lg {
  padding: .75rem 1.25rem;
  font-weight: 700;
}

.tax-code-card {
  height: 400px;
  width: 628px;
  border-radius: 25px;
  padding: 10px 10px 10px 10px;
  background-color: #FFFFFF;
  color: #009247;
  text-shadow: none;
}

.header-card {
  height: 41.2%;
  background-color: #009247;
  border-radius: 25px 25px 0px 0px;
}

.content-card {
  height: 52.8%;
  font-size: 11px;
}

.content-card>form>.form-group {
  margin-bottom: 0.3rem;
}
</style>
