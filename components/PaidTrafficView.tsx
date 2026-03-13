import React, { useState, useEffect } from 'react';
import { supabase, useAuth } from '../lib/supabase';
import {
  TrendingUp,
  Plus,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  MousePointerClick,
  Target,
  BarChart3,
  Edit2,
  AlertCircle,
  Save,
  X,
  CheckCircle2,
  Lightbulb,
  Rocket
} from 'lucide-react';

interface PaidTrafficReport {
  id?: string;
  client_id: string;
  month: number;
  year: number;
  meta_investment: number;
  meta_impressions: number;
  meta_clicks: number;
  meta_conversions: number;
  meta_cpc: number;
  meta_cpm: number;
  meta_ctr: number;
  meta_roas: number;
  google_investment: number;
  google_impressions: number;
  google_clicks: number;
  google_conversions: number;
  google_cpc: number;
  google_cpm: number;
  google_ctr: number;
  google_roas: number;
  total_investment: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  overall_roas: number;
  highlights?: string;
  recommendations?: string;
  next_month_strategy?: string;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const emptyForm: Omit<PaidTrafficReport, 'client_id'> = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  meta_investment: 0,
  meta_impressions: 0,
  meta_clicks: 0,
  meta_conversions: 0,
  meta_cpc: 0,
  meta_cpm: 0,
  meta_ctr: 0,
  meta_roas: 0,
  google_investment: 0,
  google_impressions: 0,
  google_clicks: 0,
  google_conversions: 0,
  google_cpc: 0,
  google_cpm: 0,
  google_ctr: 0,
  google_roas: 0,
  total_investment: 0,
  total_impressions: 0,
  total_clicks: 0,
  total_conversions: 0,
  overall_roas: 0,
  highlights: '',
  recommendations: '',
  next_month_strategy: '',
};

export const PaidTrafficView: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { activeClient, userRole } = useAuth();
  const [view, setView] = useState<'list' | 'form'>('list');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Date selection state
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Data state
  const [report, setReport] = useState<PaidTrafficReport | null>(null);
  const [form, setForm] = useState<Omit<PaidTrafficReport, 'client_id'>>(emptyForm);

  useEffect(() => {
    if (activeClient) {
      fetchReport(selectedMonth, selectedYear);
    }
  }, [activeClient, selectedMonth, selectedYear]);

  const fetchReport = async (month: number, year: number) => {
    if (!activeClient) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('paid_traffic_reports')
        .select('*')
        .eq('client_id', activeClient.id)
        .eq('month', month)
        .eq('year', year)
        .maybeSingle();

      if (error) throw error;
      setReport(data);
    } catch (err: any) {
      console.error('Error fetching report:', err);
      setError('Erro ao carregar o relatório.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const openNewForm = () => {
    setForm({
      ...emptyForm,
      month: selectedMonth,
      year: selectedYear,
    });
    setView('form');
    setError(null);
  };

  const openEditForm = () => {
    if (report) {
      setForm(report);
      setView('form');
      setError(null);
    }
  };

  const handleInputChange = (field: keyof PaidTrafficReport, value: any) => {
    setForm(prev => {
      const newForm = { ...prev, [field]: value };
      
      // Auto-calculate totals if numeric fields changed
      if (typeof value === 'number') {
        newForm.total_investment = Number(newForm.meta_investment) + Number(newForm.google_investment);
        newForm.total_impressions = Number(newForm.meta_impressions) + Number(newForm.google_impressions);
        newForm.total_clicks = Number(newForm.meta_clicks) + Number(newForm.google_clicks);
        newForm.total_conversions = Number(newForm.meta_conversions) + Number(newForm.google_conversions);
        
        if (newForm.total_investment > 0) {
          newForm.overall_roas = (
            (Number(newForm.meta_roas) * Number(newForm.meta_investment)) + 
            (Number(newForm.google_roas) * Number(newForm.google_investment))
          ) / newForm.total_investment;
        } else {
          newForm.overall_roas = 0;
        }
      }
      
      return newForm;
    });
  };

  const handleSave = async () => {
    if (!activeClient) return;
    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...form,
        client_id: activeClient.id,
      };

      const { error: upsertError } = await supabase
        .from('paid_traffic_reports')
        .upsert(payload, { onConflict: 'client_id,month,year' });

      if (upsertError) throw upsertError;

      await fetchReport(form.month, form.year);
      setSelectedMonth(form.month);
      setSelectedYear(form.year);
      setView('list');
    } catch (err: any) {
      console.error('Error saving report:', err);
      setError(err.message || 'Erro ao salvar o relatório.');
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value || 0);
  };

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format((value || 0) / 100);
  };

  // ---- LIST VIEW ----
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {onBack && (
                <button 
                  onClick={onBack}
                  className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-brand-dark mr-1"
                  title="Voltar ao Dashboard"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Tráfego Pago</h1>
                <p className="text-sm text-gray-500">Relatórios de performance de anúncios</p>
              </div>
            </div>
            {(userRole === 'admin' || userRole === 'team') && (
              <button
                onClick={openNewForm}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Novo Relatório
              </button>
            )}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-6">
          {/* Month Selector */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={handlePreviousMonth}
              className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-gray-800 min-w-[150px] text-center">
              {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
              disabled={selectedMonth === new Date().getMonth() + 1 && selectedYear === new Date().getFullYear()}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
            </div>
          ) : !report ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200 border-dashed">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Nenhum relatório para {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Os dados de performance deste mês ainda não foram consolidados.
              </p>
              {(userRole === 'admin' || userRole === 'team') && (
                <button
                  onClick={openNewForm}
                  className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium shadow-sm"
                >
                  Criar Relatório
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* KPI Summary Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-500">Total Investido</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(report.total_investment)}</p>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MousePointerClick className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-500">Total Cliques</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(report.total_clicks)}</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-500">Total Conversões</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(report.total_conversions)}</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-500">ROAS Geral</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{report.overall_roas.toFixed(2)}x</p>
                </div>
              </div>

              {/* Platform Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Meta Ads */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-blue-50 border-b border-blue-100 px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs">f</div>
                      <h3 className="font-bold text-blue-900">Meta Ads</h3>
                    </div>
                    <span className="text-sm font-semibold text-blue-700">{formatCurrency(report.meta_investment)}</span>
                  </div>
                  <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Impressões</p>
                      <p className="font-semibold text-gray-900">{formatNumber(report.meta_impressions)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cliques</p>
                      <p className="font-semibold text-gray-900">{formatNumber(report.meta_clicks)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Conversões</p>
                      <p className="font-semibold text-gray-900">{formatNumber(report.meta_conversions)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">CTR</p>
                      <p className="font-semibold text-gray-900">{formatPercent(report.meta_ctr)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">CPC</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(report.meta_cpc)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">CPM</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(report.meta_cpm)}</p>
                    </div>
                    <div className="col-span-2 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-600">ROAS da Plataforma</p>
                        <p className="text-lg font-bold text-blue-600">{report.meta_roas.toFixed(2)}x</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Ads */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-red-50 border-b border-red-100 px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center text-white font-bold text-xs">G</div>
                      <h3 className="font-bold text-red-900">Google Ads</h3>
                    </div>
                    <span className="text-sm font-semibold text-red-700">{formatCurrency(report.google_investment)}</span>
                  </div>
                  <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Impressões</p>
                      <p className="font-semibold text-gray-900">{formatNumber(report.google_impressions)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cliques</p>
                      <p className="font-semibold text-gray-900">{formatNumber(report.google_clicks)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Conversões</p>
                      <p className="font-semibold text-gray-900">{formatNumber(report.google_conversions)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">CTR</p>
                      <p className="font-semibold text-gray-900">{formatPercent(report.google_ctr)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">CPC</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(report.google_cpc)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">CPM</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(report.google_cpm)}</p>
                    </div>
                    <div className="col-span-2 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-600">ROAS da Plataforma</p>
                        <p className="text-lg font-bold text-red-600">{report.google_roas.toFixed(2)}x</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insights Sections */}
              <div className="space-y-4">
                {report.highlights && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex">
                    <div className="w-2 bg-green-500 shrink-0"></div>
                    <div className="p-5 flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <h3 className="font-bold text-gray-900">O que funcionou bem</h3>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{report.highlights}</p>
                    </div>
                  </div>
                )}

                {report.recommendations && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex">
                    <div className="w-2 bg-blue-500 shrink-0"></div>
                    <div className="p-5 flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-gray-900">Pontos de melhoria</h3>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{report.recommendations}</p>
                    </div>
                  </div>
                )}

                {report.next_month_strategy && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex">
                    <div className="w-2 bg-purple-500 shrink-0"></div>
                    <div className="p-5 flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <Rocket className="w-5 h-5 text-purple-600" />
                        <h3 className="font-bold text-gray-900">Estratégia para o próximo mês</h3>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{report.next_month_strategy}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              {(userRole === 'admin' || userRole === 'team') && (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={openEditForm}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-bold uppercase tracking-wider"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar Relatório
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- FORM VIEW ----
  if (view === 'form') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView('list')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={saving}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {report ? 'Editar Relatório' : 'Novo Relatório'}
                </h1>
                <p className="text-sm text-gray-500">
                  {MONTH_NAMES[form.month - 1]} {form.year}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView('list')}
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-bold shadow-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Salvando...' : 'Salvar Relatório'}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          {/* Date Selector */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">Período do Relatório</h2>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Mês</label>
                <select
                  value={form.month}
                  onChange={(e) => handleInputChange('month', Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {MONTH_NAMES.map((m, i) => (
                    <option key={i + 1} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Ano</label>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => handleInputChange('year', Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meta Ads Form */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-blue-50 border-b border-blue-100 px-5 py-3">
                <h3 className="font-bold text-blue-900 flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-[10px]">f</div>
                  Meta Ads
                </h3>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Investimento (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.meta_investment}
                    onChange={(e) => handleInputChange('meta_investment', Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Impressões</label>
                    <input
                      type="number"
                      value={form.meta_impressions}
                      onChange={(e) => handleInputChange('meta_impressions', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Cliques</label>
                    <input
                      type="number"
                      value={form.meta_clicks}
                      onChange={(e) => handleInputChange('meta_clicks', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Conversões</label>
                    <input
                      type="number"
                      value={form.meta_conversions}
                      onChange={(e) => handleInputChange('meta_conversions', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">CTR (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.meta_ctr}
                      onChange={(e) => handleInputChange('meta_ctr', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">CPC (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.meta_cpc}
                      onChange={(e) => handleInputChange('meta_cpc', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">CPM (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.meta_cpm}
                      onChange={(e) => handleInputChange('meta_cpm', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <label className="block text-xs font-bold text-blue-700 uppercase tracking-wider mb-1.5">ROAS (Meta)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.meta_roas}
                    onChange={(e) => handleInputChange('meta_roas', Number(e.target.value))}
                    className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 text-sm font-bold text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                  />
                </div>
              </div>
            </div>

            {/* Google Ads Form */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-red-50 border-b border-red-100 px-5 py-3">
                <h3 className="font-bold text-red-900 flex items-center gap-2">
                  <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-white text-[10px]">G</div>
                  Google Ads
                </h3>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Investimento (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.google_investment}
                    onChange={(e) => handleInputChange('google_investment', Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Impressões</label>
                    <input
                      type="number"
                      value={form.google_impressions}
                      onChange={(e) => handleInputChange('google_impressions', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Cliques</label>
                    <input
                      type="number"
                      value={form.google_clicks}
                      onChange={(e) => handleInputChange('google_clicks', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Conversões</label>
                    <input
                      type="number"
                      value={form.google_conversions}
                      onChange={(e) => handleInputChange('google_conversions', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">CTR (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.google_ctr}
                      onChange={(e) => handleInputChange('google_ctr', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">CPC (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.google_cpc}
                      onChange={(e) => handleInputChange('google_cpc', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">CPM (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.google_cpm}
                      onChange={(e) => handleInputChange('google_cpm', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <label className="block text-xs font-bold text-red-700 uppercase tracking-wider mb-1.5">ROAS (Google)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.google_roas}
                    onChange={(e) => handleInputChange('google_roas', Number(e.target.value))}
                    className="w-full border-2 border-red-200 rounded-lg px-3 py-2 text-sm font-bold text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Totais Consolidados */}
          <div className="bg-gray-900 rounded-xl p-6 text-white shadow-lg">
            <h2 className="font-bold text-gray-300 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Totais Consolidados (Calculado Automaticamente)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Investimento</p>
                <p className="text-lg font-bold">{formatCurrency(form.total_investment)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Impressões</p>
                <p className="text-lg font-bold">{formatNumber(form.total_impressions)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Cliques</p>
                <p className="text-lg font-bold">{formatNumber(form.total_clicks)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Conversões</p>
                <p className="text-lg font-bold">{formatNumber(form.total_conversions)}</p>
              </div>
              <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-gray-700 pt-3 md:pt-0 md:pl-4">
                <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">ROAS Geral</p>
                <p className="text-2xl font-bold text-orange-500">{form.overall_roas.toFixed(2)}x</p>
              </div>
            </div>
          </div>

          {/* Text Areas */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="font-bold text-gray-800 uppercase tracking-wider text-sm">Análise e Estratégia</h2>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-green-700 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                O que funcionou bem (Destaques)
              </label>
              <textarea
                value={form.highlights}
                onChange={(e) => handleInputChange('highlights', e.target.value)}
                placeholder="Descreva os principais acertos e campanhas de destaque do mês..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-blue-700 mb-2">
                <Lightbulb className="w-4 h-4" />
                Pontos de melhoria (Recomendações)
              </label>
              <textarea
                value={form.recommendations}
                onChange={(e) => handleInputChange('recommendations', e.target.value)}
                placeholder="O que pode ser otimizado ou evitado nos próximos meses..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-purple-700 mb-2">
                <Rocket className="w-4 h-4" />
                Estratégia para o próximo mês
              </label>
              <textarea
                value={form.next_month_strategy}
                onChange={(e) => handleInputChange('next_month_strategy', e.target.value)}
                placeholder="Quais são os focos, orçamentos e campanhas planejadas para o mês seguinte..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>
          
        </div>
      </div>
    );
  }

  return null;
};
