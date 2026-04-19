import { PLANS } from "../billing/plans";

export function canUseFeature(user: any, feature: keyof typeof PLANS.free) {
  const plan = PLANS[user.plan as keyof typeof PLANS];

  return plan[feature] === true || typeof plan[feature] === "number";
}