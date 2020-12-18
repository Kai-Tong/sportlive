    gotopostdetails(item){//跳转贴子详情页面
      this.$router.push('/postdetails');
      this.$store.commit('postdel',item)
    },


        gotonewsdel(e) {
      this.$router.push({
        path: "/newdel",
      });
      this.$store.commit("newsList", e);
    },



          this.$router.push({
        name: "Newdel",
        params: { id: `${e.id}` },
      });

          gotonewsdel(e) {
      this.$store.commit("newsList", e);
      this.$router.push({
        name: "Newdel",
        params: { id: `${e.id}` },
      });
    },


      metaInfo() {
    return {
      title: this.pageName,
      meta: this.metaList,
    };
  },

  pageName:"",
      metaList: [
        //SEO优化的meta数组
        {
          name: "description",
          content: "",
        },
        {
          name: "keywords",
          content: "",
        },
        {
          property: "release_date",
          content: "",
        },
      ],

       formDate(value) {
      let date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      let h =
        date.getHours().length <= 1
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
        setTimeout(() => {
      let news_addtime = this.formDate(this.newsdel.news_addtime);
      this.pageName = `${this.newsdel.news_title}_【6789体育直播】`;
      this.metaList[0].content = `${this.newsdel.news_body}`; // description
      this.metaList[1].content = `${this.newsdel.news_title}`; //name="keywords"
      this.metaList[2].content = `${news_addtime}`;
    }, 2000);

    path: '/newdel/:id.html',



        this.$router.push({
        name: "Postdetails",
        params: { id: `${item.id}` },
      });