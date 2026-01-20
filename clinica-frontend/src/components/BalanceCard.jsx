export default function BalanceCard({ deuda, onGestionarSaldo }) {
  const getBalanceInfo = (deuda) => {
    if (deuda > 0) {
      return {
        label: "Deuda",
        amount: deuda,
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: "⚠️"
      };
    } else if (deuda < 0) {
      return {
        label: "Saldo a favor",
        amount: Math.abs(deuda),
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: "✅"
      };
    } else {
      return {
        label: "Sin saldo",
        amount: 0,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        icon: "💰"
      };
    }
  };

  const balanceInfo = getBalanceInfo(deuda);

  return (
    <div className={`${balanceInfo.bgColor} rounded-lg p-4 border border-gray-200`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{balanceInfo.icon}</span>
          <div>
            <p className="text-sm text-gray-600 font-medium">
              {balanceInfo.label}
            </p>
            <p className={`text-2xl font-bold ${balanceInfo.color}`}>
              ${balanceInfo.amount.toLocaleString()}
            </p>
          </div>
        </div>
        <button
          onClick={onGestionarSaldo}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Gestionar Saldo
        </button>
      </div>
    </div>
  );
}