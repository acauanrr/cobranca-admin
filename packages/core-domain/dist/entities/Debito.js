"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debito = exports.SituacaoDebito = void 0;
// packages/core-domain/src/entities/Debito.ts
const typeorm_1 = require("typeorm"); // remova se não usar TypeORM
const Inscrito_1 = require("./Inscrito");
var SituacaoDebito;
(function (SituacaoDebito) {
    SituacaoDebito["ABERTO"] = "ABERTO";
    SituacaoDebito["PAGO"] = "PAGO";
    SituacaoDebito["PRESCRITO"] = "PRESCRITO";
})(SituacaoDebito || (exports.SituacaoDebito = SituacaoDebito = {}));
let Debito = class Debito {
    /* ---------- Domínio ---------- */
    constructor(props) {
        Object.assign(this, {
            ...props,
            // defaults
            situacao: props.situacao ?? SituacaoDebito.ABERTO,
        });
    }
    estaPrescrito(hoje = new Date()) {
        const limite = new Date(this.dataVencimento);
        limite.setFullYear(limite.getFullYear() + 5);
        return hoje > limite;
    }
};
exports.Debito = Debito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Debito.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Debito.prototype, "origemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Inscrito_1.Inscrito, { eager: true }),
    __metadata("design:type", Inscrito_1.Inscrito)
], Debito.prototype, "inscrito", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Debito.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Debito.prototype, "dataVencimento", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Debito.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Debito.prototype, "situacao", void 0);
exports.Debito = Debito = __decorate([
    (0, typeorm_1.Entity)() // remova se não usar TypeORM
    ,
    __metadata("design:paramtypes", [Object])
], Debito);
