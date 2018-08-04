<template>
<main role="main" class="inner cover">
  <div class="tax-code-card">
    <div class="header-card">
      <h1>TAX CODE</h1>
    </div>
    <div class="content-card">
      <form id="taxCodeForm" @submit.prevent="checkForm">

        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="(error, index) in errors" :key="`error-${index}`">{{ error }}</li>
          </ul>
        </p>

        <div class="form-group">
          <label class="col-sm-12 col-form-label" for="taxCode">TAX CODE</label>
          <div class="col-sm-12">
            <input v-model="taxCodeOut" type="text" class="form-control" id="taxCode" placeholder="Tax Code" disabled>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-12 col-form-label" for="surname">SURNAME</label>
          <div class="col-sm-12">
            <input v-model="surname" v-bind:class="{error: isSurError}" type="text" class="form-control" id="surname" placeholder="Surname" @input="forceUpperCase('surname')">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-12 col-form-label" for="name">NAME</label>
          <div class="col-sm-12">
            <input v-model="name" v-bind:class="{error: isNameError}" type="text" class="form-control" id="name" placeholder="Name" @input="forceUpperCase('name')">
          </div>
        </div>
        <div class="form-row col-sm-12">
          <div class="form-group col-sm-10">
            <label for="birthPlace">PLACE OF BIRTH</label>
            <vue-simple-suggest
              id="birthPlace"
              v-model="birthPlace"
              v-bind:class="{error: isBirthPlaceError}"
              mode="input"
              :list="districts"
              :display-attribute="suggestionAttribute"
              :value-attribute="suggestionAttribute"
              :filter-by-query="true"
              placeholder="Place of birth"
              @select="selected">
            </vue-simple-suggest>
          </div>
          <div class="form-group col-sm-2">
            <label for="district">DISTRICT</label>
            <input v-model="district" type="text" class="form-control testclass" id="district" placeholder="District" disabled>
          </div>
        </div>
        <div class="form-row col-sm-12">
          <div class="form-group col-sm-2">
            <label for="sex">SEX</label>
            <select v-model="sex" id="sex" class="form-control">
              <option value='F' selected>F</option>
              <option value='M'>M</option>
            </select>
          </div>
          <div class="form-group col-sm-10">
            <label for="BirthData">DATE OF BIRTH</label>
            <datepicker
              v-model="birthDate"
              name="birthPlace"
              input-class="form-control"
              v-bind:class="{error: isBirthDateError}"
              id="BirthDate"
              placeholder="Date of Birth">
            </datepicker>
          </div>
        </div>
        <div class="form-group row justify-content-center">
          <button type="submit" class="btn btn-secondary">SUBMIT</button>
        </div>
      </form>
    </div>
  </div>
</main>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {
  regex,
  foreignCountries,
  evenValuesSchema,
  oddValuesSchema
} from '../handlers';
import VueSimpleSuggest from 'vue-simple-suggest';
import 'vue-simple-suggest/dist/styles.css';
import Icon from 'vue-awesome/components/Icon'

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
      sex: 'F',
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
      if(!obj) return;
      this.object = obj;
      this.chosenDistrict(obj.district);
    },
    chosenDistrict: function(birthPlace) {
      var birthPlaceArr = birthPlace.split('(');
      this.cadastralCode = this.object.codCat;
      this.district = birthPlaceArr[birthPlaceArr.length - 1].slice(0, -1);
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

    splitChar: function(stringCheck) {
      var result = {};

      var vocals = ['A', 'E', 'I', 'O', 'U'];
      var str = stringCheck.replace(/\s/g, '');

      var vocalsInStr = [];
      var consonantsInStr = [];

      function isVocal(value) {
        if (vocals.includes(value)) {
          vocalsInStr[vocalsInStr.length] = value;
        } else {
          consonantsInStr[consonantsInStr.length] = value;
        }
      }

      var strInArray = str.split('');
      for (var i = 0; i < strInArray.length; i++) {
        isVocal(strInArray[i]);
      }

      result.vocals = vocalsInStr;
      result.consonants = consonantsInStr;

      return result;
    },

    generateSurnameCode: function(surnameSplit) {
      var result = '';

      if (surnameSplit.consonants.length > 2) {
        for (var i = 0; i < 3; i++) {
          result += surnameSplit.consonants[i];
        }
      } else {
        for (var w = 0; w < surnameSplit.consonants.length; w++) {
          result += surnameSplit.consonants[w];
        }
      }

      if (surnameSplit.vocals.length < 3 && result.length < 3) {
        for (var k = surnameSplit.vocals.length; k < 3; k++) {
          surnameSplit.vocals[surnameSplit.vocals.length] = 'X';
        }
      }

      if (result.length < 3) {
        var goal = (3 - result.length);
        for (var j = 0; j < goal; j++) {
          result += surnameSplit.vocals[j];
        }
      }

      return result;
    },

    generateNameCode: function(nameSplit) {
      var result = '';
      if (nameSplit.consonants.length > 2) {
        if (nameSplit.consonants.length === 3) {
          for (var i = 0; i < 3; i++) {
            result += nameSplit.consonants[i];
          }
        } else if (nameSplit.consonants.length > 3) {
          result += nameSplit.consonants[0];
          result += nameSplit.consonants[2];
          result += nameSplit.consonants[3];
        }
      } else {
        for (var w = 0; w < nameSplit.consonants.length; w++) {
          result += nameSplit.consonants[w];
        }
      }

      if (nameSplit.vocals.length < 3 && result.length < 3) {
        for (var k = nameSplit.vocals.length; k < 3; k++) {
          nameSplit.vocals[nameSplit.vocals.length] = 'X';
        }
      }

      if (result.length < 3) {
        var goal = (3 - result.length);
        for (var j = 0; j < goal; j++) {
          result += nameSplit.vocals[j];
        }
      }

      return result;
    },

    birthDateResult: function() {
      var result = '';
      const date = new Date(this.birthDate);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      var y = year.toString().substr(2);
      result += y;

      var genericMonth = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
      result += genericMonth[month];

      var d = '';
      if (this.sex === 'M') {
        day < 10 ? d = ('0' + day.toString()) : d = day.toString();
      } else if (this.sex === 'F') {
        d = (day + 40).toString();
      }
      result += d;
      return result;
    },

    lastCharResult: function() {
      var evenValues = [];
      var oddValues = [];

      for (var p = 0; p < this.taxCodeOut.length; p += 2) {
        oddValues[oddValues.length] = this.taxCodeOut[p];
      }
      for (var d = 1; d < this.taxCodeOut.length; d += 2) {
        evenValues[evenValues.length] = this.taxCodeOut[d];
      }

      console.log(oddValues);
      console.log(evenValues);

      var totalResult = 0;

      for (var i = 0; i < oddValues.length; i++) {
        for (var j = 0; j < oddValuesSchema.length; j++) {
          if (oddValuesSchema[j].char === oddValues[i]) {
            totalResult += oddValuesSchema[j].value;
            break;
          }
        }
      }
      console.log('intermediate result', totalResult);

      for (var k = 0; k < evenValues.length; k++) {
        for (var w = 0; w < evenValuesSchema.length; w++) {
          if (evenValuesSchema[w].char === evenValues[k]) {
            totalResult += evenValuesSchema[w].value;
            break;
          }
        }
      }

      console.log('result', totalResult);
      var lastChar = '';
      lastChar = String.fromCharCode((totalResult % 26) + 65);
      return lastChar;
    },

    createTaxCode: function() {
      var surnameSplit = this.splitChar(this.surname);
      var nameSplit = this.splitChar(this.name);
      var surnameResult = this.generateSurnameCode(surnameSplit);
      var nameResult = this.generateNameCode(nameSplit);
      var birthResult = this.birthDateResult(this.birthDate);

      this.taxCodeOut = surnameResult;
      this.taxCodeOut += nameResult;
      this.taxCodeOut += birthResult;
      this.taxCodeOut += this.cadastralCode;

      var lastCharResult = this.lastCharResult();
      this.taxCodeOut += lastCharResult;
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
      this.districts.push(...foreignCountries);
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
        console.log(this.districts);
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
    Datepicker,
    VueSimpleSuggest,
    Icon
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

main.inner.cover {
  display: flex;
  overflow-y: scroll;
}

.cover {
  padding: 0 1.5rem;
}

.cover .btn-lg {
  padding: .75rem 1.25rem;
  font-weight: 700;
}

.tax-code-card {
  height: 100%;
  width: 100%;
  flex-grow: 1;
  flex-basis: auto;
  /* border-radius: 25px; */
  padding: 10px 10px 10px 10px;
  background-color: #FFFFFF;
  color: #009247;
  text-shadow: none;
  border: 3px solid #009247;
  border-radius: 10px;
}

.header-card {
  height: 25%;
  background-color: #009247;
  margin-bottom: 10px;
  border-radius: 5px;
}

.content-card {
  height: 75%;
  font-size: 11px;
}

.content-card>form>.form-group {
  margin-bottom: 0.3rem;
}

#district {
  height: 46px;
}

</style>
