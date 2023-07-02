<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          label="افزودن حساب"
          @click.prevent="() => $router.push({ path: '/account/create' })"
        />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h4 q-ml-md text-black">حساب‌ها</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">کد</th>
              <th class="text-center">نام</th>
              <th class="text-center">بانک</th>
              <th class="text-center">مقدار</th>
              <th class="text-center">شماره حساب</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.id">
              <td class="text-center">{{ enToFa(account.id) }}</td>
              <td class="text-center">{{ account.name }}</td>
              <td class="text-center">{{ account.bank }}</td>
              <td class="text-center">{{ enToFa(addComma(account.amount)) }}</td>
              <td class="text-center">{{ enToFa(account.accountNumber) }}</td>
              <td class="text-center">{{ enToFa(datetime(account.createdAt)) }}</td>
              <td class="text-center">{{ enToFa(datetime(account.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn
                  color="info"
                  label="مشاهده"
                  @click.prevent="() => $router.push({ path: '/account/show/' + account.id })"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Tools from 'src/mixins/tools'
import Jalaali from 'src/mixins/jalaali'

export default defineComponent({
  name: 'AccountIndexPage',

  mixins: [Tools, Jalaali],

  computed: {
    ...mapGetters({
      accounts: 'account/accounts'
    })
  },

  async mounted () {
    this.$store.dispatch('account/getAccounts')
  }
})
</script>
