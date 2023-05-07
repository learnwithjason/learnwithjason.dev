"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsletterTemplateMarkup = void 0;
var fs_1 = require("fs");
var mjml_1 = require("mjml");
function getSchedule() {
    return __awaiter(this, void 0, void 0, function () {
        var date, res, schedule, formatted, mjml;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = new Date();
                    return [4 /*yield*/, fetch('https://www.learnwithjason.dev/api/v2/schedule')];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error(res);
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    schedule = _a.sent();
                    formatted = schedule
                        .filter(function (ep) { return new Date(ep.date) > date && ep.guest.name !== 'Jason Lengstorf'; })
                        .slice(0, 3)
                        .map(function (episode) {
                        return "\n        <tr>\n          <td style=\"padding: 8px 5px 4px 0\">".concat(new Date(episode.date).toLocaleDateString('en-US', { month: "short", day: 'numeric' }), "</td>\n          <td style=\"padding: 8px 0 4px\">\n            <img\n              src=\"https://res.cloudinary.com/jlengstorf/image/fetch/w_70,h_70,c_fill,g_faces,f_auto,q_auto/").concat(episode.guest.image, "\"\n              alt=\"").concat(episode.guest.name, "\"\n              width=\"35px\"\n              style=\"border-radius: 50%; vertical-align: bottom;\"\n            />\n          </td>\n          <td style=\"padding: 8px 5px 4px 0\">\n          ").concat(episode.guest.name, "\n          </td>\n          <td style=\"padding: 8px 0 4px\"><a href=\"").concat(episode.uri, "\">").concat(episode.title, "</a></th>\n        </tr>\n      ");
                    })
                        .join('');
                    mjml = "\n    <!-- LWJ SCHEDULE -->\n    <mj-section>\n      <mj-column>\n        <mj-spacer height=\"40px\" />\n        <mj-text mj-class=\"heading\">\n          <h2>Upcoming LWJ episodes:</h2>\n        </mj-text>\n      </mj-column>\n    </mj-section>\n\n    <mj-section>\n      <mj-column>\n        <mj-table font-size=\"13px\">\n          <tr style=\"text-align: left; border-bottom: 1px solid;\">\n            <th width=\"55px\" style=\"font-size: 11px; font-weight: normal; padding: 4px 0;\">Date</th>\n            <th width=\"40px\" style=\"font-size: 11px; font-weight: normal; padding: 4px 0;\">Guest</th>\n            <th width=\"100px\" style=\"font-size: 11px; font-weight: normal; padding: 4px 0;\"></th>\n            <th style=\"font-size: 11px; font-weight: normal; padding: 4px 0;\">Topic</th>\n          </tr>\n          ".concat(formatted, "\n          <tr>\n            <td colspan=\"4\" style=\"padding: 12px 0 0; font-size: 12px;\">\n              Visit <a href=\"https://www.learnwithjason.dev/schedule\">lwj.dev/schedule</a> to see all upcoming episodes.\n            </td>\n          </tr>\n        </mj-table>\n      </mj-column>\n    </mj-section>\n    ");
                    (0, fs_1.writeFileSync)('partial/schedule.mjml', mjml, 'utf-8');
                    return [2 /*return*/, mjml];
            }
        });
    });
}
function getFeaturedContent(featuredItems) {
    return __awaiter(this, void 0, void 0, function () {
        var formatted, mjml;
        return __generator(this, function (_a) {
            formatted = featuredItems.map(function (c) { return "\n      <mj-column css-class=\"content-preview\">\n        <mj-image\n          src=\"".concat(c.image.src, "\"\n          alt=\"").concat(c.image.alt, "\"\n          href=\"").concat(c.link, "\"\n        />\n        <mj-text mj-class=\"heading\" font-size=\"16px\">\n          <h3>").concat(c.heading, "</h3>\n        </mj-text>\n        <mj-text>\n          <p>").concat(c.description, "</p>\n        </mj-text>\n        <mj-button href=\"").concat(c.link, "\">Watch the episode</mj-button>\n      </mj-column>\n  "); }).join('');
            mjml = "<!-- LWJ CONTENT -->\n  <mj-section>\n    <mj-column>\n      <mj-spacer height=\"40px\" />\n      <mj-text mj-class=\"heading\">\n        <h2>Learn With Jason around the web:</h2>\n      </mj-text>\n    </mj-column>\n  </mj-section>\n\n  <mj-section>\n    ".concat(formatted, "\n  </mj-section>\n  ");
            (0, fs_1.writeFileSync)('partial/featured.mjml', mjml, 'utf-8');
            return [2 /*return*/, mjml];
        });
    });
}
function getNewsletterTemplateMarkup(_a) {
    var featuredItems = _a.featuredItems;
    return __awaiter(this, void 0, void 0, function () {
        var rawMjml;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getSchedule()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, getFeaturedContent(featuredItems)];
                case 2:
                    _b.sent();
                    rawMjml = (0, fs_1.readFileSync)('./default.mjml', 'utf8');
                    return [2 /*return*/, (0, mjml_1.default)(rawMjml)];
            }
        });
    });
}
exports.getNewsletterTemplateMarkup = getNewsletterTemplateMarkup;

getNewsletterTemplateMarkup({featuredItems:[]});
