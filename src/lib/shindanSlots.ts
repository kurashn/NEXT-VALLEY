/**
 * 無料Web集客診断は毎月5件限定。
 * 今月の残り枠は下の定数を書き換えるだけで、診断ページ・お問い合わせ・記事末尾の全箇所に反映される。
 */
export const SHINDAN_TOTAL_SLOTS = 5;
export const SHINDAN_REMAINING_SLOTS = 5; // ← 今月の残り枠（毎月ここを更新）

export const shindanSlotsJa = `毎月${SHINDAN_TOTAL_SLOTS}件限定・今月あと${SHINDAN_REMAINING_SLOTS}件`;
export const shindanSlotsEn = `${SHINDAN_TOTAL_SLOTS} per month · ${SHINDAN_REMAINING_SLOTS} left this month`;
