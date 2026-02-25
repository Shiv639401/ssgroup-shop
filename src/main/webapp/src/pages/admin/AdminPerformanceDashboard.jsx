import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Boxes, ShoppingBag, TrendingUp, Tag } from "lucide-react";
import { fetchAdminOrders, fetchRevenue } from "../../slices/orderSlice";
import { fetchDeals } from "../../slices/dealSlice";
import KpiCard from "../../components/admin/KpiCard";
import GrowthBadge from "../../components/admin/GrowthBadge";
import RevenueAreaChart from "../../components/admin/RevenueAreaChart";
import MonthlyBarChart from "../../components/admin/MonthlyBarChart";
import { dailySeries, monthlySeries, pctChange } from "../../utils/analytics";

const AdminPerformanceDashboard = () => {
  const dispatch = useDispatch();

  const products = useSelector((s) => s.products?.items || []);
  const ordersState = useSelector((s) => s.orders);
  const deals = useSelector((s) => s.deals?.items || []);

  const orders = ordersState?.adminPage?.content || [];
  const adminStatus = ordersState?.adminStatus || "idle";

  const revenueState = ordersState?.revenue || { todayRevenue: 0, monthRevenue: 0, totalRevenue: 0 };

  useEffect(() => {
    // NOTE: size bada rakho taaki analytics accurate ho
    dispatch(fetchAdminOrders({ page: 0, size: 1000 }));
    dispatch(fetchDeals());
    dispatch(fetchRevenue("TODAY"));
  }, [dispatch]);

  const daily = useMemo(() => dailySeries(orders, 30), [orders]);
  const monthly = useMemo(() => monthlySeries(orders, 12), [orders]);

  const totalOrders = orders.length;

  const totalRevenue = useMemo(() => {
    // if backend revenue exists, prefer it; else calc from monthly sum
    const sumMonthly = monthly.reduce((s, m) => s + (m.revenue || 0), 0);
    return revenueState?.totalRevenue > 0 ? revenueState.totalRevenue : sumMonthly;
  }, [monthly, revenueState]);

  // Growth: compare last month vs previous month
  const growth = useMemo(() => {
    if (monthly.length < 2) return 0;
    const last = monthly[monthly.length - 1]?.revenue || 0;
    const prev = monthly[monthly.length - 2]?.revenue || 0;
    return pctChange(last, prev);
  }, [monthly]);

  return (
    <div className="text-white">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-yellow-400">Admin Performance 📊</h1>
          <p className="text-white/60 mt-1">Live KPIs + trends for your store</p>
        </div>

        <div className="text-white/60 text-sm">
          Status: <span className="text-white">{adminStatus}</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-6 mt-10 md:grid-cols-4">
        <KpiCard icon={<Boxes className="text-yellow-400" size={20} />} title="Total Products" value={products.length} />

        <KpiCard
          icon={<ShoppingBag className="text-yellow-400" size={20} />}
          title="Total Orders"
          value={adminStatus === "loading" ? 0 : totalOrders}
          right={<GrowthBadge value={growth} />}
        />

        <KpiCard
          icon={<TrendingUp className="text-yellow-400" size={20} />}
          title="Total Revenue"
          value={adminStatus === "loading" ? 0 : totalRevenue}
          prefix="₹ "
          right={<GrowthBadge value={growth} />}
        />

        <KpiCard icon={<Tag className="text-yellow-400" size={20} />} title="Active Deals" value={deals.length} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 mt-10 lg:grid-cols-2">
        <RevenueAreaChart data={daily} title="Revenue (Last 30 Days)" />
        <MonthlyBarChart data={monthly} title="Monthly Trend (Last 12 Months)" />
      </div>

      {/* Extra KPIs */}
      <div className="grid gap-6 mt-10 lg:grid-cols-3">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-white font-semibold mb-2">Today Revenue</h3>
          <p className="text-yellow-400 text-3xl font-bold">₹ {revenueState?.todayRevenue || 0}</p>
          <p className="text-white/50 text-sm mt-2">From backend revenue endpoint</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-white font-semibold mb-2">This Month Revenue</h3>
          <p className="text-yellow-400 text-3xl font-bold">₹ {revenueState?.monthRevenue || 0}</p>
          <p className="text-white/50 text-sm mt-2">Month to date</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-white font-semibold mb-2">Growth Insight</h3>
          <p className="text-white/70">
            Last month vs previous month:
            <span className="ml-2">
              <GrowthBadge value={growth} />
            </span>
          </p>
          <p className="text-white/50 text-sm mt-2">Uses chart computed revenue</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPerformanceDashboard;