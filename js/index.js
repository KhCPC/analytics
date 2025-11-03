// Функція для обгортання довгих міток
            function wrapLabel(label) {
                if (label.length <= 16) return label;
                const words = label.split(' ');
                let lines = [];
                let currentLine = '';

                words.forEach(word => {
                    if ((currentLine + ' ' + word).length <= 16 || currentLine.length === 0) {
                        currentLine = (currentLine.length === 0) ? word : currentLine + ' ' + word;
                    } else {
                        lines.push(currentLine);
                        currentLine = word;
                    }
                });
                lines.push(currentLine);
                return lines;
            }

            // Обов'язкова функція налаштування Chart.js
            const baseChartOptions = {
                
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                family: 'Inter',
                            }
                        }
                    }},
                    tooltip: {
                        callbacks: {
                            title: function (tooltipItems) {
                                const item = tooltipItems[0];
                                let label = item.chart.data.labels[item.dataIndex];
                                if (Array.isArray(label)) {
                                    return label.join(' ');
                                } else {
                                    return label;
                                }
                            }
                        }
                    }
                };
    
    
        // ДАНІ ДЛЯ ЧАРТІВ
        const growthData = {
            labels: ['2019', '2021'],
            datasets: [{
                label: 'Кількість фахівців (умовний індекс)',
                data: [31000, 45000],
                borderWidth: 3,
                borderColor: '#60a5fa',
                backgroundColor: [
                    'rgba(59,130,246,0.3)', '#FF5733'
                ],
                type: 'line',
                tension: 0.3,
                fill: true,
            }]
        };

        const presenceData = {
            labels: ['лютий 2022', 'літо 2022'],
            datasets: [{
                data: [4, 96],
                backgroundColor: ['#f87171', '#3b82f6'],
                hoverOffset: 4
            }]          
        };

        const jobChangeData = {
            labels: ['Змінили місце роботи', 'Без змін'],
                datasets: [{
                data: [27, 73],
                backgroundColor: ['#fbbf24', '#a855f7'],
                hoverOffset: 4
            }]
        };

        const specializationData = {
            labels: [
                wrapLabel('Software Development Specialists'),
                'QA Specialists',
                'Management',
                'Marketing/Sales',
                'Other'
            ],
            datasets: [{
                label: 'Відсоток фахівців',
                data: [62, 12, 10, 5, 11],
                backgroundColor: ['#3b82f6', '#ef4444', '#22c55e', '#ec4899', '#facc15']
            }]
        };

        // ІНІЦІАЛІЗАЦІЯ ЧАРТІВ
        window.onload = () => {
            new Chart(
                document.getElementById('growthChart'), 
                { 
                    type: 'line', 
                    data: growthData, 
                    options: baseChartOptions
                }
            );
            new Chart(document.getElementById('presenceChart'), { type: 'doughnut', data: presenceData, options: baseChartOptions });
            new Chart(document.getElementById('jobChangeChart'), { type: 'pie', data: jobChangeData, options: baseChartOptions });
            new Chart(document.getElementById('specializationChart'), { type: 'bar', data: specializationData, options: { ...baseChartOptions, indexAxis: 'y', scales: { x: { beginAtZero: true }}, plugins: { legend: { display: true } } } });

                       
            // Анімація секцій при скролі
            const sections = document.querySelectorAll('section');
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.2 });
            sections.forEach(sec => observer.observe(sec));
        };