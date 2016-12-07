# RPGUser
###我包含的四层结构是：用户->英雄->装备（宠物）->宝石
###每个人物的装备与宠物是可以提高战斗力数值的物品
###User（用户） ： 基础属性：cash:钱； gold：金币；  exp：经验； totalExp:全部经验；  level：等级
###高级属性包括：  getFightPower战斗力   getTotalExp当前经验值的上限(this.level + 50) * this.level;
###hero里面包含：
###MaxHP英雄最大生命值： return this.level*100*this.quality;
###attack英雄攻击力： 遍历所有装备，将attack值加到result上
###fightPower：计算最大战斗力，this.maxHP*1.5+this.attack*1.8
###defence：英雄防御力： 英雄装备所有防具防御力之和 * 0.2 + 当前等级 * 英雄的品质 *　2
###fightPower英雄战斗力： 英雄装备所有武器战斗力之和 + 英雄装备所有防具战斗力之和 + （10 + 英雄攻击力 * 10 + 英雄防御力 * 8 + 英雄敏捷值 * 6） * 英雄等级 * 英雄品质
