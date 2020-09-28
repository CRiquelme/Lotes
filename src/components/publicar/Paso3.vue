<template>
  <section>
    <div class="clearfix">
      <!-- En el action se pone la url de subida -->
      <label class="text-lg">
        Te recomendamos subir fotografías de: La mejor vista, el acceso, de
        frente y desde arriba
      </label>
      <a-upload
        action="#"
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 5">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Subir fotografía
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>

    <div class="my-4">
      <label class="text-lg">La mayoría del terreno está:</label>
      <div class="uk-form-controls">
        <label class="block"
          ><input class="uk-radio" type="radio" name="nivel_terreno" /> Bajo
          nivel de calle</label
        >
        <label class="block"
          ><input class="uk-radio" type="radio" name="nivel_terreno" /> A nivel
          de la calle</label
        >
        <label class="block"
          ><input class="uk-radio" type="radio" name="nivel_terreno" /> Sobre
          nivel de la calle</label
        >
      </div>
    </div>

    <div class="my-4">
      <label for="" class="text-lg"
        >Mira que fácil... podremos decirle a los compradores la topografía
        predominante de tu terreno, solo mira en la imagen la posición de la
        rodilla</label
      >
      <div
        class="uk-grid-large uk-child-width-1-3@s uk-child-width-1-6@m uk-flex-center uk-text-left hiddenradio"
        uk-grid
      >
        <label>
          <input type="radio" v-model="topografia" value="small" />
          <img src="/images/plano-0-a-5.png" />
        </label>
        <label>
          <input
            type="radio"
            v-model="topografia"
            value="plana_ondulada_de_5_a_15"
          />
          <img src="/images/plana_ondulada_de_5_a_15.png" />
        </label>
        <label>
          <input
            type="radio"
            v-model="topografia"
            value="accidentada_de_15_a_30"
          />
          <img src="/images/accidentada_de_15_a_30.png" />
        </label>
        <label>
          <input
            type="radio"
            v-model="topografia"
            value="muy_accidentada_de_30_a_45"
          />
          <img src="/images/muy_accidentada_de_30_a_45.png" />
        </label>
        <label>
          <input
            type="radio"
            v-model="topografia"
            value="quebrada_de_45_a_60"
          />
          <img src="/images/quebrada_de_45_a_60.png" />
        </label>
        <label>
          <input
            type="radio"
            v-model="topografia"
            value="muy_quebrada_mayor_a_60"
          />
          <img src="/images/muy_quebrada_mayor_a_60.png" />
        </label>
      </div>
    </div>

    <div class="py-4">
      <p class="text-lg">
        Opcional pero muy "Importante"... puedes adjuntar aquí documentos del
        terreno, que sean públicos... "Eso si, te advierto"... Si alguien se
        pone en contacto contigo y hace mención de estos documentos casi seguro
        que estas bastante cerca de vender.
      </p>
      <div>
        <label for="file_plano_de_catastro">Plano de catastro</label>
        <input
          type="file"
          ref="file_plano_de_catastro"
          id="file_plano_de_catastro"
        />
      </div>
      <div>
        <label for="file_uso_de_suelo">Uso de suelo</label>
        <input type="file" ref="file_uso_de_suelo" id="file_uso_de_suelo" />
      </div>
      <div>
        <label for="file_disponibilidad_de_agua">Disponibilidad de agua</label>
        <input
          type="file"
          ref="file_disponibilidad_de_agua"
          id="file_disponibilidad_de_agua"
        />
      </div>
      <div>
        <label for="file_disponibilidad_electrica"
          >Disponibilidad eléctrica</label
        >
        <input
          type="file"
          ref="file_disponibilidad_electrica"
          id="file_disponibilidad_electrica"
        />
      </div>

      <div>
        <label for="file_visado_municipal">Visado municipal</label>
        <input
          type="file"
          ref="file_visado_municipal"
          id="file_visado_municipal"
        />
      </div>
    </div>
  </section>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      headers: {
        authorization: "authorization-text",
      },
      topografia: "",
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
  },
};
</script>

<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.hiddenradio [type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.hiddenradio [type="radio"] + img {
  position: relative;
  cursor: pointer;
  filter: drop-shadow(0px 7px 7px #000);
  max-height: 300px;
  height: 100%;
  width: 100%;
  transform: scale(1);
  transition: all 300ms ease;
  z-index: 1;
}
.hiddenradio [type="radio"] + img:hover {
  transform: scale(1.5);
  filter: drop-shadow(1px 1px 5px rgb(105, 104, 104));
  z-index: 3;
  background-color: white;
}
.hiddenradio [type="radio"]:checked + img {
  outline: 1px solid rgb(5, 56, 12);
  transform: scale(1);
  background-color: white;
  filter: none;
}
</style>
