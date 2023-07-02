<template lang="html">
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <p>
            <strong>کد: </strong> {{ account.id }}
          </p>
          <p>
            <strong>نام: </strong> {{ account.name }}
          </p>
          <p>
            <strong>بانک: </strong> {{ account.bank }}
          </p>
          <p>
            <strong>مقدار: </strong> {{ enToFa(addComma(account.amount)) }}
          </p>
          <p>
            <strong>شماره حساب: </strong> {{ account.accountNumber }}
          </p>
          <p>
            <strong>توضیحات: </strong> {{ account.description }}
          </p>
          <p>
            <strong>تاریخ ایجاد: </strong> {{ enToFa(datetime(account.createdAt)) }}
          </p>
          <p>
            <strong>تاریخ بروزرسانی: </strong> {{ enToFa(datetime(account.updatedAt)) }}
          </p>
          <!-- TODO: Add edit account -->
          <q-btn
            color="warning"
            label="ویرایش"
            @click.prevent="handleEditPage"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card class="row justify-center">
      <q-card-section>
        <!-- TODO: Add account invoices -->
        A table of account invoices
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'AccountShowPage',

  computed: {
    ...mapGetters({
      account: 'account/account'
    })
  },

  mounted () {
    this.$store.dispatch('account/getAccount', {
      id: this.$route.params.accountId
    })
  },

  methods: {
    enToFa (value: string): string {
      // @ts-ignore
      return this.$persianTools.digitsEnToFa(value)
    },

    addComma (value: string): string {
      // @ts-ignore
      return this.$persianTools.addCommas(value)
    },

    datetime (value: string): string {
      // @ts-ignore
      return this.$moment(value).format('jYYYY/jM/jD HH:mm')
    },

    handleEditPage () {
      this.$router.push({ path: '/account/edit/' + this.account.id })
    }
  }
})
</script>
