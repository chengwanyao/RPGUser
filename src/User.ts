enum ArmorType{
    LIGHTARMOR = 1,
    LEATHERARMOR = 1.4,
    PLATEARMOR = 2,
    HEAVYARMOR = 2.4,
    NOTHINGTOWEAR = 0.2
}

var Cache: MethodDecorator = (target : any,propertyKey,descriptor : PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function(){
        //console.log(target,propertyKey)
        var cacheKey = "__cache" + propertyKey;
        if(!target[cacheKey]){
            target[cacheKey] = method.apply(this);
        }
            return target[cacheKey];
    }
}

class User{
    cash:number=0;//钱
    gold:number=0;
    exp:number=0;//经验
    totalExp:number=0;//全部经验
  
    level:number=0;//等级
    heroes:Hero[]=[];
    
    pet:Pet;

    //高阶属性
      get herosInTeam(){
        return this.heroes.filter(hero=>hero.isInTeam);
    }

    getFightPower(){
        var result=0;
        this.herosInTeam.map(hero=>result+=hero.getFightPower());//map:将数组中的某一属性生成一个新的数组，
        //result+=this.pet.getFightPower();
        return result;
        
    }

   getTotalExp(){
         this.totalExp = (this.level + 50) * this.level;
         return this.totalExp;
     }
}

class Hero{

    isInTeam:boolean=false;

    equipments:Equipment[]=[];

    hp=50;

    level=1;

    quality:number=2.8;

    __armorOnEquip : Armor[] = [];

    get maxHP(){//英雄最大生命值
        return this.level*100*this.quality;
        
    }

   

    get attack(){//英雄攻击力
        var result=0;
        this.equipments.forEach(e=>result+=e.attack);//遍历所有装备，将attack值加到result上。
        return result;
    }

    get fightPower(){
        return this.getFightPower();
    }

    getFightPower(){//计算战斗力
        return this.maxHP*1.5+this.attack*1.8;
    }

     getDefence(){//英雄防御力
        var result = 0;
        this.__armorOnEquip.forEach(armor => result += armor.getDefence() * 0.2);
        result += this.level * 2 * this.quality;
        return result;
    }
}


class Pet{//宠物权重：5，提供力量，敏捷，智力各三点
    getFightPower(){
        return 100;
    }
}





class Equipment{
    quality  = 0;
    name : string = "";
     __jewelOnEquip : Jewel[] = [];
    jewel:Jewel[]=[];
    constructor(quality : number){
         this.quality = quality;
     }

    get attack(){
        var result=0;
        this.jewel.forEach(e=>result+=e.attack);
        return result;
    }
}

class Jewel{
    quality :number;
    constructor(quality : number){
         this.quality = quality;
     }
    get attack(){
        var result=0;
        result=this.quality*1.5;
        return result;
    }

    getFightPower(){
        var result = 0;
        result = this.quality * 10;
        return result;
    }
}

class Armor extends Equipment{
     //defence = 0;
     armorType:ArmorType;
     isWeapon = false;

     constructor(quality : number ,name : string, armorType : ArmorType){
         super(quality);
         this.name = name;
         //this.quality = quality;
         this.armorType = armorType;

     }


    @Cache
     getDefence(){
         var result = 0;
         this.__jewelOnEquip.forEach(jewel => result += jewel.getFightPower() * 0.4);
         result += 6 * this.armorType * this.quality; 
         return result;
     }

    
}