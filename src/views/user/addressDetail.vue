<template>
    <div>
        <Header v-bind="{left:1,centerValue:'地址',center:2}"></Header>
        <section class="content_main pt">
            <div class="address-box padt8 address-plz">
                <ul>
                    <li>
                        <span class="lab-tittle" style="margin-right: .6rem;">姓名</span>
                        <input type="text" placeholder="请输入姓名" v-model="addressInfo.name"/>
                    </li>
                    <li>
                        <span class="lab-tittle">联系方式</span>
                        <input type="tel" maxlength=11 onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                               ng-pattern="/[^a-zA-Z]/" placeholder="请输入11位手机号码" v-model="addressInfo.phone"/></li>
                    <li class="detail" @click="showDistrictChoice=true">
                        <span class="lab-tittle">所在地区</span>
                        <span class="fr mr detali-address">{{addressDetail}}</span>
                        <i class="icon iconfont icon-gengduo address-gengduo"></i>
                    </li>
                    <li class="detail"
                        style="height:83px;display: flex;justify-content: space-between;padding-right: 12px">
                        <span class="lab-tittle">详细地址</span>
                        <textarea class="detail_address" name="" rows="" cols="" placeholder="街道门牌信息"
                                  v-model="addressInfo.detail"></textarea>
                    </li>
                </ul>
            </div>
            <div class="btn_box">
                <a style="display:inline-block;width:100%" @click="judge(1)" v-if="editAddress">保存</a>
                <a style="display:inline-block;width:100%" @click="judge(0)" v-else>新增</a>
            </div>
        </section>
        <AddressSelector
            api="https://www.liansj.com:4433/api/area.lists?pid="
            ref="district"
            v-model="showDistrictChoice"
            @on-choice="onChoiceDistrict"
            @on-cancel="">
        </AddressSelector>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"
    import AddressSelector from "@/components/Selector"

    export default {
        name: "addressDetail",
        data() {
            return {
                showDistrictChoice: false,
                addressInfo: {
                    name: "",
                    phone: "",
                    area1: "",
                    area2: "",
                    area3: "",
                    detail: ""
                },
                addressDetail: "",
                editAddress: "",
                editAddressDetail: ""
            }
        },
        components: {
            AddressSelector
        },
        mounted() {
            if (this.$route.query.info) this.getEditAddress()
        },
        methods: {
            //编辑地址
            getEditAddress() {
                this.editAddress = JSON.parse(this.$route.query.info)
                console.log(this.editAddress)
                this.addressInfo.name = this.editAddress.name
                this.addressInfo.phone = this.editAddress.phone
                this.addressInfo.area1 = this.editAddress.area1
                this.addressInfo.area2 = this.editAddress.area2
                this.addressInfo.area3 = this.editAddress.area3
                let tmp = this.editAddress.detail
                let a = tmp.split(" ")
                this.addressInfo.detail = a[a.length - 1]
                console.log(a.splice(-1, 1))
                this.addressDetail = a.join(" ")
                console.log(a)
            },
            onChoiceDistrict(choice, id, name) {
                this.addressInfo.area1 = id[0] ? id[0] : ''
                this.addressInfo.area2 = id[1] ? id[1] : 0
                this.addressInfo.area3 = id[2] ? id[1] : 0
                this.addressDetail = name.join(" ")
            },
            judge(id) {
                let tel = /^[1]{1}[3,5,7,8]{1}[0-9]{9}$/;
                if (this.addressInfo.name == '') {
                    this.fail('请输入姓名')
                    return
                }
                if (this.addressInfo.phone == '') {
                    this.fail('请输入电话号码')
                    return
                }
                if (!tel.test(this.addressInfo.phone)) {
                    this.fail("手机号码格式不正确");
                    return;
                }
                if (this.addressInfo.area1 == '') {
                    this.fail('请输入地址')
                    return
                }
                if (this.addressInfo.detail == '') {
                    this.fail('请输入详细地址')
                    return
                }
                if (id) {
                    this.edit()
                } else {
                    this.submit()
                }
            },
            submit() {
                this.addressInfo.detail = this.addressDetail + " " + this.addressInfo.detail
                this.$store.dispatch(types.USER_ADDADDRESS, this.addressInfo).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        this.success('新增成功')
                        this.$router.go(-1)
                    } else {
                        this.fail('新增失败')
                    }
                })
            },
            edit() {
                this.addressInfo.detail = this.addressDetail + " " + this.addressInfo.detail
                this.addressInfo.id = this.editAddress.id
                this.$store.dispatch(types.USER_EDITRESSLIST, this.addressInfo).then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        this.success('修改成功')
                        this.$router.go(-1)
                    } else {
                        this.fail('修改失败')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .yd-cell {
        padding: 0 .2rem !important;
    }
</style>