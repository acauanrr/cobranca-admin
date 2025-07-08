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
exports.ProcessoAdministrativo = exports.StatusProcesso = void 0;
// packages/core-domain/src/entities/ProcessoAdministrativo.ts
const typeorm_1 = require("typeorm"); // remova se não usar TypeORM
const Debito_1 = require("./Debito");
var StatusProcesso;
(function (StatusProcesso) {
    StatusProcesso["PENDENTE_ANALISE"] = "PENDENTE_ANALISE";
    StatusProcesso["PRESCRITO"] = "PRESCRITO";
    StatusProcesso["EM_ANDAMENTO"] = "EM_ANDAMENTO";
    StatusProcesso["CONCLUIDO"] = "CONCLUIDO";
    StatusProcesso["CANCELADO"] = "CANCELADO";
})(StatusProcesso || (exports.StatusProcesso = StatusProcesso = {}));
let ProcessoAdministrativo = class ProcessoAdministrativo {
    constructor(props) {
        Object.assign(this, {
            ...props,
            criadoEm: props.criadoEm ?? new Date(),
            status: props.status ?? StatusProcesso.PENDENTE_ANALISE,
        });
    }
    marcarPrescrito() { this.status = StatusProcesso.PRESCRITO; }
    concluir() { this.status = StatusProcesso.CONCLUIDO; }
    cancelar() { this.status = StatusProcesso.CANCELADO; }
};
exports.ProcessoAdministrativo = ProcessoAdministrativo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProcessoAdministrativo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Debito_1.Debito, { eager: true }),
    __metadata("design:type", Debito_1.Debito)
], ProcessoAdministrativo.prototype, "debito", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], ProcessoAdministrativo.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], ProcessoAdministrativo.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProcessoAdministrativo.prototype, "observacoes", void 0);
exports.ProcessoAdministrativo = ProcessoAdministrativo = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], ProcessoAdministrativo);
