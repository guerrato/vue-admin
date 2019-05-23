<template>
  <div>
    <section class="content-header">
      <h1>
        Group
        <small>Members in group</small>
      </h1>
    </section>

    <section class="content">
      <div class="col-md-6">
        <v-box type="default">
          <div class="box-header with-border">
            <h3 class="box-title">Not Allocated</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <v-draggable class="products-list product-list-in-box" :list="list2" group="members" @change="log">
              <li class="item" v-for="(element, index) in list2" :key="element.name">
                <div class="product-img">
                  <img src="/img/default-50x50.gif" alt="Product Image">
                </div>
                <div class="product-info">
                  <a href="javascript:void(0)" class="product-title">{{ element.name }}
                    <span class="label label-warning pull-right">${{ index }}</span></a>
                  <span class="product-description">
                        Samsung 32" 1080p 60Hz LED Smart HDTV.
                      </span>
                </div>
              </li>
            </v-draggable>
          </div>
        </v-box>
      </div>
      <div class="col-md-6">
        <v-box type="primary">
          <div class="box-header with-border">
            <h3 class="box-title">Allocated</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <v-draggable class="products-list product-list-in-box" :list="list2" group="members" @change="log">
              <li class="item" v-for="(element, index) in list2" :key="element.name">
                <div class="product-img">
                  <img src="/img/default-50x50.gif" alt="Product Image">
                </div>
                <div class="product-info">
                  <a href="javascript:void(0)" class="product-title">{{ element.name }}
                    <span class="label label-warning pull-right">${{ index }}</span></a>
                  <span class="product-description">
                        Samsung 32" 1080p 60Hz LED Smart HDTV.
                      </span>
                </div>
              </li>
            </v-draggable>
          </div>
        </v-box>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notAlocated: [],
      allocated: []
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
