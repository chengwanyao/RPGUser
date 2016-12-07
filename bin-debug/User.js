var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ArmorType;
(function (ArmorType) {
    ArmorType[ArmorType["LIGHTARMOR"] = 1] = "LIGHTARMOR";
    ArmorType[ArmorType["LEATHERARMOR"] = 1.4] = "LEATHERARMOR";
    ArmorType[ArmorType["PLATEARMOR"] = 2] = "PLATEARMOR";
    ArmorType[ArmorType["HEAVYARMOR"] = 2.4] = "HEAVYARMOR";
    ArmorType[ArmorType["NOTHINGTOWEAR"] = 0.2] = "NOTHINGTOWEAR";
})(ArmorType || (ArmorType = {}));
var Cache = function (target, propertyKey, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        //console.log(target,propertyKey)
        var cacheKey = "__cache" + propertyKey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this);
        }
        return target[cacheKey];
    };
};
var User = (function () {
    function User() {
        this.cash = 0; //钱
        this.gold = 0;
        this.exp = 0; //经验
        this.totalExp = 0; //全部经验
        this.level = 0; //等级
        this.heroes = [];
    }
    var d = __define,c=User,p=c.prototype;
    d(p, "herosInTeam"
        //高阶属性
        ,function () {
            return this.heroes.filter(function (hero) { return hero.isInTeam; });
        }
    );
    p.getFightPower = function () {
        var result = 0;
        this.herosInTeam.map(function (hero) { return result += hero.getFightPower(); }); //map:将数组中的某一属性生成一个新的数组，
        //result+=this.pet.getFightPower();
        return result;
    };
    p.getTotalExp = function () {
        this.totalExp = (this.level + 50) * this.level;
        return this.totalExp;
    };
    return User;
}());
egret.registerClass(User,'User');
var Hero = (function () {
    function Hero() {
        this.isInTeam = false;
        this.equipments = [];
        this.hp = 50;
        this.level = 1;
        this.quality = 2.8;
        this.__armorOnEquip = [];
    }
    var d = __define,c=Hero,p=c.prototype;
    d(p, "maxHP"
        ,function () {
            return this.level * 100 * this.quality;
        }
    );
    d(p, "attack"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (e) { return result += e.attack; }); //遍历所有装备，将attack值加到result上。
            return result;
        }
    );
    d(p, "fightPower"
        ,function () {
            return this.getFightPower();
        }
    );
    p.getFightPower = function () {
        return this.maxHP * 1.5 + this.attack * 1.8;
    };
    p.getDefence = function () {
        var result = 0;
        this.__armorOnEquip.forEach(function (armor) { return result += armor.getDefence() * 0.2; });
        result += this.level * 2 * this.quality;
        return result;
    };
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Pet = (function () {
    function Pet() {
    }
    var d = __define,c=Pet,p=c.prototype;
    p.getFightPower = function () {
        return 100;
    };
    return Pet;
}());
egret.registerClass(Pet,'Pet');
var Equipment = (function () {
    function Equipment(quality) {
        this.quality = 0;
        this.name = "";
        this.__jewelOnEquip = [];
        this.jewel = [];
        this.quality = quality;
    }
    var d = __define,c=Equipment,p=c.prototype;
    d(p, "attack"
        ,function () {
            var result = 0;
            this.jewel.forEach(function (e) { return result += e.attack; });
            return result;
        }
    );
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Jewel = (function () {
    function Jewel(quality) {
        this.quality = quality;
    }
    var d = __define,c=Jewel,p=c.prototype;
    d(p, "attack"
        ,function () {
            var result = 0;
            result = this.quality * 1.5;
            return result;
        }
    );
    p.getFightPower = function () {
        var result = 0;
        result = this.quality * 10;
        return result;
    };
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
var Armor = (function (_super) {
    __extends(Armor, _super);
    function Armor(quality, name, armorType) {
        _super.call(this, quality);
        this.isWeapon = false;
        this.name = name;
        //this.quality = quality;
        this.armorType = armorType;
    }
    var d = __define,c=Armor,p=c.prototype;
    p.getDefence = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4; });
        result += 6 * this.armorType * this.quality;
        return result;
    };
    __decorate([
        Cache
    ], p, "getDefence", null);
    return Armor;
}(Equipment));
egret.registerClass(Armor,'Armor');
//# sourceMappingURL=User.js.map