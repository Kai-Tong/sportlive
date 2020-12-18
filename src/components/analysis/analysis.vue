<template>
  <div id="analysis">
    <home_herder :headerKey="headerKey"></home_herder>
    <div class="analys boxshadow">
      <analysisheader :checkmenutype="checkmenutype"></analysisheader>
      <!-- 联赛积分 -->
      <!-- <div class="title_alliancepoints"></div>
      <div class="alliancepoints_div cl">
        <div class="alliancepoints_left left">
          <div class="alliancepoints_left_header">
            <img :src="liveList.aicon" alt="" />
            <span class="alliancepoints_left_header_team">{{
              liveList.aname
            }}</span>
          </div>
          <div class="alliancepoints_main">
            <div class="alliancepoints_main_intr cl">
              <div class="left gamenum">比赛场数</div>
              <div class="left win">胜</div>
              <div class="left lose">负</div>
              <div class="left win">平</div>
              <div class="left goal">进球</div>
              <div class="left conceded">失球</div>
              <div class="left goaldiff">净胜球</div>
              <div class="left integral">积分</div>
              <div class="left rank">排名</div>
              <div class="left winrate">胜率</div>
            </div>
            <div class="alliancepoints_main_intr1 cl">
              <div class="left gamenum">76</div>
              <div class="left win">8</div>
              <div class="left lose">2</div>
              <div class="left win">4</div>
              <div class="left goal">50</div>
              <div class="left conceded">6</div>
              <div class="left goaldiff">12</div>
              <div class="left integral">20</div>
              <div class="left rank">1</div>
              <div class="left winrate">84.45%</div>
            </div>
          </div>
        </div>
        <div class="alliancepoints_right left">
          <div class="alliancepoints_left_header">
            <img :src="liveList.bicon" alt="" />
            <span class="alliancepoints_left_header_team">{{
              liveList.bname
            }}</span>
          </div>
          <div class="alliancepoints_main">
            <div class="alliancepoints_main_intr cl">
              <div class="left gamenum">比赛场数</div>
              <div class="left win">胜</div>
              <div class="left lose">负</div>
              <div class="left win">平</div>
              <div class="left goal">进球</div>
              <div class="left conceded">失球</div>
              <div class="left goaldiff">净胜球</div>
              <div class="left integral">积分</div>
              <div class="left rank">排名</div>
              <div class="left winrate">胜率</div>
            </div>
            <div class="alliancepoints_main_intr1 cl">
              <div class="left gamenum">76</div>
              <div class="left win">8</div>
              <div class="left lose">2</div>
              <div class="left win">4</div>
              <div class="left goal">50</div>
              <div class="left conceded">6</div>
              <div class="left goaldiff">12</div>
              <div class="left integral">20</div>
              <div class="left rank">1</div>
              <div class="left winrate">84.45%</div>
            </div>
          </div>
        </div>
      </div> -->
      <!-- 历史交锋 -->
      <div class="title_history"></div>
      <div class="game_history_div">
        <div class="game_history_main">
          <div class="game_histor_header cl">
            <!-- <div class="left cu b1b">全部赛事</div>
            <div class="left cu b1b">
              <el-dropdown>
                <span class="el-dropdown-link">
                  5场<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu
                  slot="dropdown"
                  v-for="(item, index) in game_num"
                  :key="index"
                >
                  <el-dropdown-item>{{ item.inquirenum }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div> -->
          </div>
          <div>
            <div class="cl game_column">
              <!-- <div class="left match">赛事</div> -->
              <!-- <div class="left matchtime">比赛日期</div> -->
              <div class="left ateam">主队</div>
              <div class="left score">比分</div>
              <div class="left bteam">客队</div>
              <!-- <div class="left halftime">半场</div>
              <div class="left corner">角球</div>
              <div class="left winlose">胜负</div>
              <div class="left winlosescore">胜负得分</div>
              <div class="left handicap">让球</div>
              <div class="left trend">走势</div>
              <div class="left goals">进球数</div> -->
            </div>
            <div
              class="cl game_column1"
              v-for="(item, index) in againstRecord"
              :key="index"
            >
              <!-- <div class="left match">足协杯</div> -->
              <!-- <div class="left matchtime">2020-05-01</div> -->
              <div class="left ateam">{{ item.hIdVsAid[0] }}</div>
              <div
                class="left score"
                v-text="
                  item.totalScores[0] != null && item.totalScores[0] != null
                    ? `${item.totalScores[0]}:${item.totalScores[1]}`
                    : '暂无'
                "
              ></div>
              <div class="left bteam">{{ item.hIdVsAid[1] }}</div>
              <!-- <div class="left halftime">0:2</div>
              <div class="left corner">0：5</div>
              <div class="left winlose green">负</div>
              <div class="left winlosescore">10.08 20.08 20.08</div>
              <div class="left handicap">10.08 20.08 20.08</div>
              <div class="left trend green">输</div>
              <div class="left goals red">大</div> -->
            </div>
            <!-- <div class="sum">
              近5场交锋，胜<span class="red">0</span>出场，平局<span
                class="blue"
                >0</span
              >场，输<span class="green">1</span>场；近5场走势，<span
                class="red"
                >0</span
              >赢<span class="blue">0</span>平<span class="green">1</span
              >输；其中<span class="red">1</span>场为大球，<span class="green"
                >1</span
              >场为小球
            </div> -->
          </div>
        </div>
      </div>
      <!-- 近期战绩 -->
      <div class="title_recrd"></div>
      <div class="recrd cl">
        <div class="left recrdleft">
          <div class="recrdleft_header">
            <div class="left centerimg">
              <img :src="liveList.hicon" alt="" />
              <span class="recrd_left_header_team">{{ liveList.hname }}</span>
            </div>
            <div class="left cu b1b">
              <el-dropdown @command="hRecentNumfn">
                <span class="el-dropdown-link">
                  {{ hRecentNum
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in game_num"
                    :key="item.id"
                    :command="item.network"
                    >{{ item.inquirenum }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!-- <div class="left cu b1b">
              <el-dropdown>
                <span class="el-dropdown-link">
                  全部<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in game_num"
                    :key="index"
                    >{{ item.inquirenum }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div> -->
            <!-- <div class="left cu b1b">
              <el-dropdown>
                <span class="el-dropdown-link">
                  赛事筛选<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu
                  slot="dropdown"
                  v-for="(item, index) in game_num"
                  :key="index"
                >
                  <el-dropdown-item>{{ item.inquirenum }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div> -->
          </div>
          <div class="recrdleft_main">
            <div class="cl recrdleft_main_column">
              <!-- <div class="left recrd_match">赛事</div> -->
              <!-- <div class="left recrd_date">比赛日期</div> -->
              <div class="left recrd_ateam">主队</div>
              <div class="left recrd_score">比分</div>
              <div class="left recrd_bteam">客队</div>
              <!-- <div class="left recrd_half">半场</div> -->
              <!-- <div class="left recrd_winlose">胜负</div> -->
              <!-- <div class="left recrd_trend">走势</div> -->
              <!-- <div class="left recrd_goalnum">进球数</div> -->
            </div>
            <div
              v-for="(item, index) in aRecrdListFilter"
              :key="index"
              class="cl recrdleft_main_data"
            >
              <!-- <div class="left recrd_match ov">{{ item.recrd_match }}</div> -->
              <!-- <div class="left recrd_date">{{ item.recrd_date }}</div> -->
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.isHost == 1 ? hTeamName : item.enemyName"
                placement="top"
              >
                <div class="left recrd_ateam ov cu">
                  {{ item.isHost == 1 ? hTeamName : item.enemyName }}
                </div>
              </el-tooltip>
              <div
                class="left recrd_score"
                v-text="
                  item.totalScores[0] != null
                    ? `${item.totalScores[0]}:${item.totalScores[1]}`
                    : '暂无'
                "
              ></div>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.isHost == 0 ? hTeamName : item.enemyName"
                placement="top"
              >
                <div class="left recrd_bteam ov cu">
                  {{ item.isHost == 0 ? hTeamName : item.enemyName }}
                </div>
              </el-tooltip>
              <!-- <div class="left recrd_half">{{ item.recrd_half }}</div> -->
              <!-- <div class="left recrd_winlose">{{ item.recrd_winlose }}</div> -->
              <!-- <div class="left recrd_trend">{{ item.recrd_trend }}</div> -->
              <!-- <div class="left recrd_goalnum">{{ item.recrd_goalnum }}</div> -->
            </div>
            <!-- <div class="Echarts">
              <div id="main" style="width: 6rem; height: 4rem"></div>
            </div> -->
            <!-- <div>
              青岛轻钢近5场，胜出0场，平局0场，输1场；胜率：20%；赢率：40%；大球率：80%
            </div> -->
          </div>
        </div>
        <div class="left recrdright">
          <div class="recrdleft_header">
            <div class="left centerimg">
              <img :src="liveList.aicon" alt="" />
              <span class="recrd_left_header_team">{{ liveList.aname }}</span>
            </div>
            <div class="left cu b1b">
              <el-dropdown @command="aRecentNumfn">
                <span class="el-dropdown-link">
                  {{ aRecentNum
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in game_num1"
                    :key="item.id"
                    :command="item.network"
                    >{{ item.inquirenum }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!-- <div class="left cu b1b">
              <el-dropdown>
                <span class="el-dropdown-link">
                  全部<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in game_num"
                    :key="index"
                    >{{ item.inquirenum }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="left cu b1b">
              <el-dropdown>
                <span class="el-dropdown-link">
                  赛事筛选<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu
                  slot="dropdown"
                  v-for="(item, index) in game_num"
                  :key="index"
                >
                  <el-dropdown-item>{{ item.inquirenum }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div> -->
          </div>
          <div class="recrdleft_main">
            <div class="cl recrdleft_main_column">
              <!-- <div class="left recrd_match">赛事</div> -->
              <!-- <div class="left recrd_date">比赛日期</div> -->
              <div class="left recrd_ateam">主队</div>
              <div class="left recrd_score">比分</div>
              <div class="left recrd_bteam">客队</div>
              <!-- <div class="left recrd_half">半场</div> -->
              <!-- <div class="left recrd_winlose">胜负</div> -->
              <!-- <div class="left recrd_trend">走势</div> -->
              <!-- <div class="left recrd_goalnum">进球数</div> -->
            </div>
            <div
              v-for="(item, index) in aRecrdList1Filter"
              :key="index"
              class="cl recrdleft_main_data"
            >
              <!-- <div class="left recrd_match ov">{{ item.recrd_match }}</div> -->
              <!-- <div class="left recrd_date">{{ item.recrd_date }}</div> -->
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.isHost == 1 ? aTeamName : item.enemyName"
                placement="top"
              >
                <div class="left recrd_ateam ov cu">
                  {{ item.isHost == 1 ? aTeamName : item.enemyName }}
                </div>
              </el-tooltip>
              <div
                class="left recrd_score"
                v-text="
                  item.totalScores[0] != null
                    ? `${item.totalScores[0]}:${item.totalScores[1]}`
                    : '暂无'
                "
              ></div>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.isHost == 0 ? aTeamName : item.enemyName"
                placement="top"
              >
                <div class="left recrd_bteam ov cu">
                  {{ item.isHost == 0 ? aTeamName : item.enemyName }}
                </div>
              </el-tooltip>
              <!-- <div class="left recrd_half">{{ item.recrd_half }}</div> -->
              <!-- <div class="left recrd_winlose">{{ item.recrd_winlose }}</div> -->
              <!-- <div class="left recrd_trend">{{ item.recrd_trend }}</div> -->
              <!-- <div class="left recrd_goalnum">{{ item.recrd_goalnum }}</div> -->
            </div>
            <!-- <div class="Echarts">
              <div id="main1" style="width: 6rem; height: 4rem"></div>
            </div> -->
            <!-- <div>
              青岛轻钢近5场，胜出0场，平局0场，输1场；胜率：20%；赢率：40%；大球率：80%
            </div> -->
          </div>
        </div>
      </div>
      <!-- 进球分布 -->
      <div class="title_distributed"></div>
      <div class="distributed_main cl">
        <div class="distributed_left left">
          <div class="distributed_left_header">
            <img :src="liveList.hicon" alt="" />
            <span class="distributed_left_header_span">{{
              liveList.hname
            }}</span>
          </div>
          <div class="disstributed_left_main cl">
            <div class="disstributed_left_main_titleleft left">
              <div class="kong">　</div>
              <div class="lei">总</div>
              <div class="lei">主</div>
              <div class="lei">客</div>
            </div>
            <div class="left disstributed_left_main_titleleft2">
              <div class="kong cl disstributed_left_main_titleright">
                <div class="left">0-15"</div>
                <div class="left">15-30"</div>
                <div class="left">30-45"</div>
                <div class="left">45-60"</div>
                <div class="left">60-75"</div>
                <div class="left">75-90"</div>
              </div>
              <div
                class="lei cl disstributed_left_main_right"
                v-for="(item, index) in disstributed"
                :key="index"
              >
                <div class="cl">
                  <div class="left disstributeddiv">
                    {{ item.goalCount0to15 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.goalCount15to30 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.goalCount30to45 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.goalCount45to60 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.goalCount60to75 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.goalCount75to90 }}
                  </div>
                </div>
                <div class="cl">
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount0to15 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount15to30 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount30to45 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount45to60 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount60to75 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount75to90 }}
                  </div>
                </div>
                <div class="cl">
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount0to15 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount15to30 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount30to45 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount45to60 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount60to75 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount75to90 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="distributed_right left">
          <div class="distributed_left_header">
            <img :src="liveList.aicon" alt="" />
            <span class="alliancepoints_left_header_team">{{
              liveList.aname
            }}</span>
          </div>
          <div class="disstributed_left_main cl">
            <div class="disstributed_left_main_titleleft left">
              <div class="kong">　</div>
              <div class="lei">总</div>
              <div class="lei">主</div>
              <div class="lei">客</div>
            </div>
            <div class="left disstributed_left_main_titleleft2">
              <div class="kong cl disstributed_left_main_titleright">
                <div class="left">0-15"</div>
                <div class="left">15-30"</div>
                <div class="left">30-45"</div>
                <div class="left">45-60"</div>
                <div class="left">60-75"</div>
                <div class="left">75-90"</div>
              </div>
              <div
                class="lei cl disstributed_left_main_right"
                v-for="(item, index) in disstributed1"
                :key="index"
              >
                <div class="cl">
                  <div class="left disstributeddiv">
                    {{ item.goalCount0to15 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.goalCount15to30 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.goalCount30to45 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.goalCount45to60 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.goalCount60to75 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.goalCount75to90 }}
                  </div>
                </div>
                <div class="cl">
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount0to15 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount15to30 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount30to45 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount45to60 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount60to75 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.homeTeamGoalCount75to90 }}
                  </div>
                </div>
                <div class="cl">
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount0to15 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount15to30 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount30to45 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount45to60 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount60to75 }}
                  </div>
                  <div class="left disstributeddiv">
                    {{ item.awayTeamGoalCount75to90 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 走势 -->
      <!-- <div class="title_trend"></div>
      <div class="trend_main cl">
        <div class="trend_left left">
          <div class="distributed_left_header">
            <img :src="liveList.aicon" alt="" />
            <span class="distributed_left_header_span">{{
              liveList.aname
            }}</span>
          </div>
          <div class="trend_total_header cl">
            <div class="trend_total_header1 left">让球数</div>
            <div class="trend_total_header2 left">进球数</div>
          </div>
          <div class="trend_left_main">
            <div class="trend_left_main_title cl">
              <div class="w20 left">
                <div class="left">&nbsp</div>
                <div class="left">赛</div>
              </div>
              <div class="w40 left">
                <div class="left">赢</div>
                <div class="left">和</div>
                <div class="left">输</div>
                <div class="left">赢率</div>
              </div>
              <div class="w40 left">
                <div class="left">大球</div>
                <div class="left">大球率</div>
                <div class="left">小球</div>
                <div class="left">小球率</div>
              </div>
            </div>
            <div
              class="trend_left_main_titlefor cl"
              v-for="(item, index) in trendList"
              :key="index"
            >
              <div class="w20 left">
                <div class="left">{{ item.title }}</div>
                <div class="left">
                  {{ item.gametotal }}
                </div>
              </div>
              <div class="w40 left">
                <div class="left">
                  {{ item.win }}
                </div>
                <div class="left">
                  {{ item.level }}
                </div>
                <div class="left">
                  {{ item.lose }}
                </div>
                <div class="left">
                  {{ item.winrate }}
                </div>
              </div>
              <div class="w40 left bigball">
                <div class="left">
                  {{ item.bigball }}
                </div>
                <div class="left">
                  {{ item.bigtate }}
                </div>
                <div class="left">
                  {{ item.smallball }}
                </div>
                <div class="left">
                  {{ item.smallrate }}
                </div>
              </div>
            </div>
            <div class="cl trend_total_end">
              <div class="left trend_total_end1">近6场</div>
              <div class="left trend_total_end2">输赢输赢输赢输赢</div>
              <div class="left trend_total_end2">大大小大大小</div>
            </div>
          </div>
        </div>
        <div class="trend_right left">
          <div class="distributed_left_header">
            <img :src="liveList.bicon" alt="" />
            <span class="alliancepoints_left_header_team">{{
              liveList.bname
            }}</span>
          </div>
          <div class="trend_total_header cl">
            <div class="trend_total_header1 left">让球数</div>
            <div class="trend_total_header2 left">进球数</div>
          </div>
          <div class="trend_left_main">
            <div class="trend_left_main_title cl">
              <div class="w20 left">
                <div class="left">&nbsp</div>
                <div class="left">赛</div>
              </div>
              <div class="w40 left">
                <div class="left">赢</div>
                <div class="left">和</div>
                <div class="left">输</div>
                <div class="left">赢率</div>
              </div>
              <div class="w40 left">
                <div class="left">大球</div>
                <div class="left">大球率</div>
                <div class="left">小球</div>
                <div class="left">小球率</div>
              </div>
            </div>
            <div
              class="trend_left_main_titlefor cl"
              v-for="(item, index) in trendList"
              :key="index"
            >
              <div class="w20 left">
                <div class="left">{{ item.title }}</div>
                <div class="left">
                  {{ item.gametotal }}
                </div>
              </div>
              <div class="w40 left">
                <div class="left">
                  {{ item.win }}
                </div>
                <div class="left">
                  {{ item.level }}
                </div>
                <div class="left">
                  {{ item.lose }}
                </div>
                <div class="left">
                  {{ item.winrate }}
                </div>
              </div>
              <div class="w40 left bigball">
                <div class="left">
                  {{ item.bigball }}
                </div>
                <div class="left">
                  {{ item.bigtate }}
                </div>
                <div class="left">
                  {{ item.smallball }}
                </div>
                <div class="left">
                  {{ item.smallrate }}
                </div>
              </div>
            </div>
            <div class="cl trend_total_end">
              <div class="left trend_total_end1">近6场</div>
              <div class="left trend_total_end2">输赢输赢输赢输赢</div>
              <div class="left trend_total_end2">大大小大大小</div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="margin50">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const home_herder = () => import("../home/home_herder");
const analysisheader = () => import("./analysisheader");
const Footer = () => import("../footer/footer");
export default {
  data() {
    return {
      checkmenutype: 1,
      aTeamName: "", //客队名字
      hTeamName: "", //主队名字
      trendList: [
        {
          title: "总",
          gametotal: 30,
          win: 12,
          level: 1,
          lose: 2,
          winrate: "80%",
          bigball: 12,
          bigtate: "40%",
          smallball: 12,
          smallrate: "40%",
        },
        {
          title: "主场",
          gametotal: 30,
          win: 12,
          level: 1,
          lose: 2,
          winrate: "80%",
          bigball: 12,
          bigtate: "40%",
          smallball: 12,
          smallrate: "40%",
        },
        {
          title: "客场",
          gametotal: 30,
          win: 12,
          level: 1,
          lose: 2,
          winrate: "80%",
          bigball: 12,
          bigtate: "40%",
          smallball: 12,
          smallrate: "40%",
        },
      ],
      disstributed: [], //主队进球分布
      disstributed1: [], //客队进球分布
      againstRecord: [], //历史交锋
      againstRecordNull: [
        {
          hIdVsAid: ["-", "-"],
          halfScores: "-",
          totalScores: ["-", "-"],
        },
      ],
      activeIndex: "2",
      headerKey: "2",
      game_num: [], //主队近期战绩
      game_num1: [], //客队近期战绩
      aRecrdList: [], //主队近期战绩
      aRecrdListFilter: [], //主队近期筛选战绩
      aRecrdList1: [], //客队近期战绩
      aRecrdList1Filter: [], //客队近期筛选战绩
      hRecentNum: "10场", //主队切换后状态
      aRecentNum: "10场", //客队切换后状态
    };
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      var option = {
        color: ["#c0e2ff"],
        xAxis: {
          type: "category",

          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          // type: "value",
          data: ["负", "平", "胜"],
        },
        series: [
          {
            data: [1, 0, 1, 2, 0],
            type: "line",
            areaStyle: {},
          },
        ],
      };
      myChart.setOption(option);
    },
    myEcharts2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main1"));
      var option = {
        color: ["#c0e2ff"],
        xAxis: {
          type: "category",

          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          // type: "value",
          data: ["负", "平", "胜"],
        },
        series: [
          {
            data: [1, 0, 1, 2, 0],
            type: "line",
            areaStyle: {},
          },
        ],
      };
      myChart.setOption(option);
    },
    hRecentNumfn(command) {
      this.game_num.map((item) => {
        if (item.network == command) {
          this.hRecentNum = item.inquirenum;
        }
      });
      let pipi = this.aRecrdList;
      pipi.slice(0, command);
      this.aRecrdListFilter = pipi.slice(0, command);
    },
    aRecentNumfn(command) {
      this.game_num1.map((item) => {
        if (item.network == command) {
          this.aRecentNum = item.inquirenum;
        }
      });
      let pipi = this.aRecrdList1;
      pipi.slice(0, command);
      this.aRecrdList1Filter = pipi.slice(0, command);
    },
    getdata() {
      //获取首页数据
      this.$axios({
        url: `${this.$api.homeindex.sta()}${this.liveList.matchId}`,
        method: "get",
      }).then((res) => {
        let { code, msg, params } = res.data;
        if (code == 0) {
          let { goaldist, history } = params;
          let {
            aTeamId,
            hTeamId,
            againstRecord,
            aTeamName,
            hTeamName,
            hRecord,
            aRecord,
          } = history;

          this.aTeamName = aTeamName; //客队名字
          this.hTeamName = hTeamName; //主队名字

          goaldist.map((item) => {
            //进球分布数据
            if (item.teamId == aTeamId) {
              this.disstributed1.push(item);
            } else if (item.teamId == hTeamId) {
              this.disstributed.push(item);
            }
          });

          //历史交锋数据
          for (let i = 0; i < againstRecord.length; i++) {
            for (let t = 0; t < againstRecord[i].hIdVsAid.length; t++) {
              if (againstRecord[i].hIdVsAid[t] == aTeamId) {
                againstRecord[i].hIdVsAid[t] = aTeamName;
              } else if (againstRecord[i].hIdVsAid[t] == hTeamId) {
                againstRecord[i].hIdVsAid[t] = hTeamName;
              }
            }
          }
          if (againstRecord != false) {
            this.againstRecord = againstRecord;
          } else {
            this.againstRecord = this.againstRecordNull;
          }
          console.log(againstRecord);
          //近期战绩
          this.aRecrdList = this.aRecrdListFilter = hRecord;
          this.aRecrdList1 = this.aRecrdList1Filter = aRecord;

          this.aRecrdListFilter = hRecord.slice(0, 10);
          this.aRecrdList1Filter = aRecord.slice(0, 10);
          let hgame_num = Math.ceil(hRecord.length / 5);
          let agame_num = Math.ceil(aRecord.length / 5);

          let hList = [];
          for (let i = 0; i < hgame_num; i++) {
            hList.push({
              id: i + 1,
              inquirenum: `${(i + 1) * 5}场`,
              network: (i + 1) * 5,
            });
          }
          this.game_num = hList;

          let aList = [];
          for (let i = 0; i < agame_num; i++) {
            aList.push({
              id: i + 1,
              inquirenum: `${(i + 1) * 5}场`,
              network: (i + 1) * 5,
            });
          }
          this.game_num1 = aList;
          // console.log(this.game_num1, this.game_num);
        }
      });
    },
    // handleSelect(key, keyPath) {
    //   for (let i = 0; i < this.dataList.length; i++) {}
    // },
  },
  computed: {
    ...mapState(["liveList"]),
  },
  components: {
    home_herder,
    analysisheader,
    Footer
  },
  mounted() {
    // this.myEcharts();
    // this.myEcharts2();
  },
  created() {
    this.getdata();
  },
};
</script>

<style lang="less" scoped>
#analysis {
  background-image: url("../../image/bj.jpg");
  background-size: 100%;
}
.analys {
  padding: 17px 16px;
  width: 1300px;
  margin: auto;
  background-color: #fff;
  border-radius: 15px;
}

#analysis {
  font-size: 14px;
}
.title_alliancepoints {
  background-image: url("../../image/al/alliancepoints.png");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 1251px;
  height: 19px;
  margin: 13px auto;
}
.alliancepoints_div {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  .alliancepoints_left {
    border: 1px solid #dedede;
    border-radius: 5px;
    width: 640px;
    margin-right: 3px;
    .alliancepoints_left_header {
      font-size: 16px;
      margin: 25px 0 25px 11px;
      padding-left: 13px;
      border-left: 3px solid #51247f;
      display: flex;
      align-items: center;
      img {
        width: 27px;
        height: 27px;
      }
      .alliancepoints_left_header_team {
        color: #555555;
      }
    }
    .alliancepoints_main {
      border: 1px solid #dedede;
      margin: 0 3px;
      .alliancepoints_main_intr {
        text-align: center;
        line-height: 40px;
        background-color: #e2f1fe;
        color: #555555;
        .gamenum {
          width: 91px;
        }
        .win {
          width: 48px;
        }
        .lose {
          width: 46px;
        }
        .goal {
          width: 59px;
        }
        .conceded {
          width: 69px;
        }
        .goaldiff {
          width: 75px;
        }
        .integral {
          width: 68px;
        }
        .rank {
          width: 45px;
        }
        .winrate {
          width: 74px;
        }
      }
      .alliancepoints_main_intr1 {
        text-align: center;
        line-height: 40px;
        color: #555555;
        div {
          border-right: 1px solid #dedede;
        }

        .gamenum {
          width: 90px;
        }
        .win {
          background-color: #f7f8fd;
          color: #1a90fc;
          width: 47px;
        }
        .lose {
          background-color: #f7f8fd;
          color: #1a90fc;
          width: 45px;
        }
        .goal {
          width: 58px;
        }
        .conceded {
          width: 68px;
        }
        .goaldiff {
          width: 74px;
        }
        .integral {
          width: 67px;
        }
        .rank {
          width: 44px;
        }
        .winrate {
          background-color: #f7f8fd;
          width: 74px;
        }
      }
      .alliancepoints_main_intr1 div:last-child {
        border-right: none;
      }
    }
  }
  .alliancepoints_right {
    border: 1px solid #dedede;
    border-radius: 5px;
    width: 640px;
    .alliancepoints_left_header {
      font-size: 16px;
      margin: 25px 0 25px 11px;
      padding-left: 13px;
      border-left: 3px solid #700202;
      display: flex;
      align-items: center;
      img {
        width: 27px;
        height: 27px;
      }
      .alliancepoints_left_header_team {
        color: #555555;
      }
    }
    .alliancepoints_main {
      border: 1px solid #dedede;
      margin: 0 3px;
      .alliancepoints_main_intr {
        text-align: center;
        line-height: 40px;
        background-color: #e2f1fe;
        color: #555555;
        .gamenum {
          width: 91px;
        }
        .win {
          width: 48px;
        }
        .lose {
          width: 46px;
        }
        .goal {
          width: 59px;
        }
        .conceded {
          width: 69px;
        }
        .goaldiff {
          width: 75px;
        }
        .integral {
          width: 68px;
        }
        .rank {
          width: 45px;
        }
        .winrate {
          width: 74px;
        }
      }
      .alliancepoints_main_intr1 {
        text-align: center;
        line-height: 40px;
        color: #555555;
        div {
          border-right: 1px solid #dedede;
        }

        .gamenum {
          width: 90px;
        }
        .win {
          background-color: #f7f8fd;
          color: #1a90fc;
          width: 47px;
        }
        .lose {
          background-color: #f7f8fd;
          color: #1a90fc;
          width: 45px;
        }
        .goal {
          width: 58px;
        }
        .conceded {
          width: 68px;
        }
        .goaldiff {
          width: 74px;
        }
        .integral {
          width: 67px;
        }
        .rank {
          width: 44px;
        }
        .winrate {
          background-color: #f7f8fd;
          width: 74px;
        }
      }
      .alliancepoints_main_intr1 div:last-child {
        border-right: none;
      }
    }
  }
}
.title_history {
  background-image: url("../../image/al/history.png");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 1251px;
  height: 19px;
  margin: 13px auto;
}
.game_history_div {
  // display: flex;
  // justify-content: center;
  margin-bottom: 25px;
  .game_history_main {
    border: 1px solid #dedede;
    padding: 0 4px;
    border-radius: 5px;
    .game_histor_header {
      margin: 7px 0;
      color: #555555;

      text-align: center;
      .b1b {
        width: 98px;
        border: 1px solid #555555;
        border-radius: 12px;
        margin: 0 7px;
        height: 25px;
        line-height: 25px;
      }
      .b1b:hover {
        background-color: #1a90fc;
        color: #ffffff;
        border: 1px solid #1a90fc;
      }
      .el-dropdown {
        color: #555555;
      }
    }
    .game_column {
      color: #555555;
      line-height: 40px;
      text-align: center;
      display: flex;
      justify-content: center;
      div {
        background-color: #e2f1fe;
      }
      .match {
        width: 120px + 2px;
      }
      .matchtime {
        width: 116px + 1px;
      }
      .ateam,
      .score,
      .bteam {
        width: 108px + 1px;
      }
      .halftime {
        width: 73px + 1px;
      }
      .corner {
        width: 73px + 1px;
      }
      .winlose {
        width: 75px + 1px;
      }
      .winlosescore {
        width: 150px + 1px;
      }
      .handicap {
        width: 150px + 1px;
      }
      .trend {
        width: 74px + 1px;
      }
      .goals {
        width: 100px + 1px;
      }
    }
    .game_column1 {
      color: #555555;
      line-height: 40px;
      text-align: center;
      display: flex;
      justify-content: center;
      div {
        border-right: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
      }
      .match {
        width: 120px;
        border-left: 1px solid #dedede;
      }
      .matchtime {
        width: 116px;
      }
      .ateam,
      .score,
      .bteam {
        width: 108px;
        color: #000;
      }
      .halftime {
        width: 73px;
      }
      .green {
        color: green;
      }
      .red {
        color: red;
      }
      .corner {
        width: 73px;
      }
      .winlose {
        width: 75px;
      }
      .winlosescore {
        width: 150px;
      }
      .handicap {
        width: 150px;
      }
      .trend {
        width: 74px;
      }
      .goals {
        width: 100px;
      }
    }
    .sum {
      text-align: center;
      color: #555555;
      margin: 18px 0;
    }
    .blue {
      color: #1a90fc;
    }
    .red {
      color: red;
    }
    .green {
      color: green;
    }
  }
}
.title_recrd {
  background-image: url("../../image/al/record.png");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 1251px;
  height: 19px;
  margin: 13px auto;
}
.recrdleft {
  width: 640px;
  border: 1px solid #dedede;
  margin: 0px 7px;
  .recrdleft_header {
    font-size: 16px;
    margin: 25px 0 25px 11px;
    padding-left: 13px;
    border-left: 3px solid #51247f;
    display: flex;
    align-items: center;
    img {
      width: 27px;
      height: 27px;
    }
    .alliancepoints_left_header_team {
      color: #555555;
    }
    .b1b {
      width: 98px;
      border: 1px solid #555555;
      border-radius: 12px;
      margin: 0 7px;
      line-height: 25px;
      height: 25px;
      text-align: center;
    }
    .b1b:hover {
      background-color: #1a90fc;
      color: #ffffff;
      border: 1px solid #1a90fc;
    }
    .el-dropdown {
      color: #555555;
    }
  }
  .recrdleft_main {
    text-align: center;
    line-height: 39px;
    color: #555555;
    border: 1px solid #dedede;
    margin: 0 4px;
    .recrdleft_main_column {
      .recrd_match {
        width: 78px + 1px;
      }
      .recrd_date {
        width: 86px + 1px;
      }
      .recrd_ateam {
        width: (94.5px + 1px) * 2;
      }
      .recrd_score {
        width: (50px + 1px) * 2;
      }
      .recrd_bteam {
        width: (94.5px + 1px) * 2;
      }
      .recrd_half {
        width: 49px + 1px;
      }
      .recrd_winlose {
        width: 50px + 1px;
      }
      .recrd_trend {
        width: 44px + 1px;
      }
      .recrd_goalnum {
        width: 69px + 1px;
      }
    }
    .recrdleft_main_data {
      div {
        border-top: 1px solid #dedede;
        border-right: 1px solid #dedede;
      }
      div:last-child {
        border-right: none;
      }
      .recrd_match {
        width: 78px;
      }
      .recrd_date {
        width: 86px;
      }
      .recrd_ateam {
        width: 94.5px * 2;
      }
      .recrd_score {
        width: 50px * 2;
      }
      .recrd_bteam {
        width: 94.5px * 2;
      }
      .recrd_half {
        width: 49px;
      }
      .recrd_winlose {
        width: 50px;
      }
      .recrd_trend {
        width: 44px;
      }
      .recrd_goalnum {
        width: 69px;
      }
    }
  }
  .recrdleft_main_data:nth-child(2n) {
    background-color: #f7f8fd;
  }
}
.recrdright {
  width: 640px;
  border: 1px solid #dedede;
  .recrdleft_header {
    font-size: 16px;
    margin: 25px 0 25px 11px;
    padding-left: 13px;
    border-left: 3px solid #51247f;
    display: flex;
    align-items: center;
    img {
      width: 27px;
      height: 27px;
    }
    .alliancepoints_left_header_team {
      color: #555555;
    }
    .b1b {
      width: 98px;
      border: 1px solid #555555;
      border-radius: 12px;
      margin: 0 7px;
      line-height: 25px;
      height: 25px;
      text-align: center;
    }
    .b1b:hover {
      background-color: #1a90fc;
      color: #ffffff;
      border: 1px solid #1a90fc;
    }
    .el-dropdown {
      color: #555555;
    }
  }
  .recrdleft_main {
    text-align: center;
    line-height: 39px;
    color: #555555;
    border: 1px solid #dedede;
    margin: 0 4px;
    .recrdleft_main_column {
      .recrd_match {
        width: 78px + 1px;
      }
      .recrd_date {
        width: 86px + 1px;
      }
      .recrd_ateam {
        width: (94.5px + 1px) * 2;
      }
      .recrd_score {
        width: (50px + 1px) * 2;
      }
      .recrd_bteam {
        width: (94.5px + 1px) * 2;
      }
      .recrd_half {
        width: 49px + 1px;
      }
      .recrd_winlose {
        width: 50px + 1px;
      }
      .recrd_trend {
        width: 44px + 1px;
      }
      .recrd_goalnum {
        width: 69px + 1px;
      }
    }
    .recrdleft_main_data {
      div {
        border-top: 1px solid #dedede;
        border-right: 1px solid #dedede;
      }
      div:last-child {
        border-right: none;
      }
      .recrd_match {
        width: 78px;
      }
      .recrd_date {
        width: 86px;
      }
      .recrd_ateam {
        width: 94.5px * 2;
      }
      .recrd_score {
        width: 50px * 2;
      }
      .recrd_bteam {
        width: 94.5px * 2;
      }
      .recrd_half {
        width: 49px;
      }
      .recrd_winlose {
        width: 50px;
      }
      .recrd_trend {
        width: 44px;
      }
      .recrd_goalnum {
        width: 69px;
      }
    }
  }
  .recrdleft_main_data:nth-child(2n) {
    background-color: #f7f8fd;
  }
  #main {
    width: 550px;
    height: 300px;
  }
}
.title_distributed {
  background-image: url("../../image/al/distributed.png");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 1251px;
  height: 19px;
  margin: 13px auto;
}
.distributed_left {
  width: 640px;
  border: 1px solid #dedede;
  margin: 0px 7px;
  .distributed_left_header {
    font-size: 16px;
    margin: 25px 0 25px 11px;
    padding-left: 13px;
    border-left: 3px solid #51247f;
    display: flex;
    align-items: center;
    img {
      width: 27px;
      height: 27px;
    }
    .distributed_left_header_span {
      color: #555555;
    }
  }
  .disstributed_left_main {
    margin: 0 3px;
    border: 1px solid #dedede;
    .disstributed_left_main_titleleft {
      width: 14%;
      text-align: center;
      div {
        border-top: 1px solid #dedede;
      }
    }
    .kong {
      height: 40px;
    }
    .lei {
      height: 35px;
      line-height: 35px;
    }
    .disstributed_left_main_titleleft2 {
      width: 85%;
      .disstributed_left_main_titleright {
        div {
          line-height: 40px;
          text-align: center;
          width: 16.5%;
          border-top: 1px solid #dedede;
        }
      }
    }
    .disstributed_left_main_right {
      .disstributeddiv {
        height: 35px;
        line-height: 35px;
        width: 16.5%;
        text-align: center;
        border-top: 1px solid #dedede;
      }
    }
  }
}
.distributed_right {
  width: 640px;
  border: 1px solid #dedede;
  .distributed_left_header {
    font-size: 16px;
    margin: 25px 0 25px 11px;
    padding-left: 13px;
    border-left: 3px solid #51247f;
    display: flex;
    align-items: center;
    img {
      width: 27px;
      height: 27px;
    }
    .distributed_left_header_span {
      color: #555555;
    }
  }
  .disstributed_left_main {
    margin: 0 3px;
    border: 1px solid #dedede;
    .disstributed_left_main_titleleft {
      width: 14%;
      text-align: center;
      div {
        border-top: 1px solid #dedede;
      }
    }
    .kong {
      height: 40px;
    }
    .lei {
      height: 35px;
      line-height: 35px;
    }
    .disstributed_left_main_titleleft2 {
      width: 85%;
      .disstributed_left_main_titleright {
        div {
          line-height: 40px;
          text-align: center;
          width: 16.5%;
          border-top: 1px solid #dedede;
        }
      }
    }
    .disstributed_left_main_right {
      .disstributeddiv {
        height: 35px;
        line-height: 35px;
        width: 16.5%;
        text-align: center;
        border-top: 1px solid #dedede;
      }
    }
  }
}
.title_trend {
  background-image: url("../../image/al/trend.png");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 1251px;
  height: 19px;
  margin: 13px auto;
}
.trend_main {
  .trend_left {
    width: 640px;
    border: 1px solid #dedede;
    margin: 0 7px;
    .distributed_left_header {
      font-size: 16px;
      margin: 25px 0 25px 11px;
      padding-left: 13px;
      border-left: 3px solid #51247f;
      display: flex;
      align-items: center;
      img {
        width: 27px;
        height: 27px;
      }
      .distributed_left_header_span {
        color: #555555;
      }
    }
    .trend_total_header {
      color: #014581;
      text-align: center;
      margin: 0 3px;
      font-size: 16px;
      .trend_total_header1 {
        margin-left: 20%;
        width: 40%;
      }
      .trend_total_header2 {
        width: 40%;
      }
    }
    .trend_left_main_title {
      color: #555555;
      border-left: 1px solid #dedede;
      border-top: 1px solid #dedede;
      border-right: 1px solid #dedede;
      margin: 0 3px;
      line-height: 35px;
      .w20 {
        width: 20%;
        text-align: center;
        div {
          width: 50%;
        }
      }
      .w40 {
        width: 40%;
        text-align: center;
        div {
          width: 25%;
        }
      }
    }
    .trend_left_main_titlefor {
      color: #555555;
      border-left: 1px solid #dedede;
      border-top: 1px solid #dedede;
      border-right: 1px solid #dedede;
      margin: 0 3px;
      line-height: 35px;
      .w20 {
        width: 20%;
        text-align: center;
        div {
          width: 50%;
        }
      }
      .w40 {
        width: calc(40% - 4px);
        text-align: center;
        background-color: #f7f8fd;
        border-left: 1px solid #dedede;
        border-right: 1px solid #dedede;
        div {
          width: 25%;
        }
      }
      .bigball {
        background-color: #eceffe;
      }
      .w40:last-child {
        margin-left: 1px;
      }
    }
    .trend_total_end {
      text-align: center;
      margin: 15px 0;
      .trend_total_end1 {
        width: 15%;
        margin-right: 5%;
      }
      .trend_total_end2 {
        width: 40%;
      }
    }
  }
  .trend_left_main:last-child .trend_left_main_titlefor {
    border-bottom: 1px solid #dedede;
  }
  .trend_right {
    width: 640px;
    border: 1px solid #dedede;
    .distributed_left_header {
      font-size: 16px;
      margin: 25px 0 25px 11px;
      padding-left: 13px;
      border-left: 3px solid #51247f;
      display: flex;
      align-items: center;
      img {
        width: 27px;
        height: 27px;
      }
      .distributed_left_header_span {
        color: #555555;
      }
    }
    .trend_total_header {
      color: #014581;
      text-align: center;
      margin: 0 3px;
      font-size: 16px;
      .trend_total_header1 {
        margin-left: 20%;
        width: 40%;
      }
      .trend_total_header2 {
        width: 40%;
      }
    }
    .trend_left_main_title {
      color: #555555;
      border-left: 1px solid #dedede;
      border-top: 1px solid #dedede;
      border-right: 1px solid #dedede;
      margin: 0 3px;
      line-height: 35px;
      .w20 {
        width: 20%;
        text-align: center;
        div {
          width: 50%;
        }
      }
      .w40 {
        width: 40%;
        text-align: center;
        div {
          width: 25%;
        }
      }
    }
    .trend_left_main_titlefor {
      color: #555555;
      border-left: 1px solid #dedede;
      border-top: 1px solid #dedede;
      border-right: 1px solid #dedede;
      margin: 0 3px;
      line-height: 35px;
      .w20 {
        width: 20%;
        text-align: center;
        div {
          width: 50%;
        }
      }
      .w40 {
        width: calc(40% - 4px);
        text-align: center;
        background-color: #f7f8fd;
        border-left: 1px solid #dedede;
        border-right: 1px solid #dedede;
        div {
          width: 25%;
        }
      }
      .bigball {
        background-color: #eceffe;
      }
      .w40:last-child {
        margin-left: 1px;
      }
    }
    .trend_total_end {
      text-align: center;
      margin: 15px 0;
      .trend_total_end1 {
        width: 15%;
        margin-right: 5%;
      }
      .trend_total_end2 {
        width: 40%;
      }
    }
  }
}
</style>