import moment from 'moment'
import { beforeGetStories } from '../vuex/types'
import Loading from './Loading'

export default {
  name: 'Before',
  components: {
    Loading
  },
  data () {
    return {
      pickerValue: new Date(),
      tempPickerValue: null
    }
  },
  computed: {
    pickerString: {
      get () {
        let s = moment(this.pickerValue).format('YYYYMMDD')
        this.$store.dispatch(beforeGetStories, s)
        return s
      }
    },
    stories () {
      return this.$store.state.Before.storiesList[this.pickerString]
    }
  },
  methods: {
    onInput (value) {
      this.tempPickerValue = value
    },
    openPicker () {
      this.$refs.picker.open()
    },
    confirm () {
      this.pickerValue = this.tempPickerValue
    },
    goToDetail (id) {
      this.$router.push(`/detail?id=${id}`)
    }
  },
  render (h) {
    let list = []
    if (this.stories) {
      for (let i = 0; i < this.stories.length; i++) {
        list.push(
          <mt-cell nativeOn-click={this.goToDetail.bind(null, this.stories[i].id)}>
            <img slot="icon" src={'/proxy?url=' + this.stories[i].images[0]} width="75" height="75"/>
            <span>{this.stories[i].title}</span>
          </mt-cell>
        )
      }
    }
    if (list.length) {
      return (
        <div style="padding-top: 40px;">
          <mt-header fixed title={this.pickerString}>
            <mt-button size="small" type="primary" nativeOn-click={this.openPicker} slot="right">选择日期</mt-button>
          </mt-header>
          {
            list
          }
          <mt-datetime-picker
            ref="picker"
            type="date"
            value={this.pickerValue}
            on-input={this.onInput}
            endDate={new Date()}
            on-confirm={this.confirm}>
          </mt-datetime-picker>
        </div>
      )
    } else {
      return <loading></loading>
    }
  }
}
