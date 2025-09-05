// Form state management
let formData = {
    firstName: '',
    lastName: '',
    companyName: '',
    businessEmail: '',
    gpuCount: '',
    startTime: '',
    gpuTypes: [],
    deployment: '',
    hearAbout: '',
    marketingConsent: false
};

// Current active tab
let activeTab = 'cloud';

// DOM elements
const cloudTab = document.getElementById('cloudTab');
const datacenterTab = document.getElementById('datacenterTab');
const cloudFields = document.getElementById('cloudFields');
const datacenterFields = document.getElementById('datacenterFields');
const datacenterFeatures = document.getElementById('datacenterFeatures');
const contactForm = document.getElementById('contactForm');

// Tab switching functionality
function switchTab(tab) {
    activeTab = tab;
    
    // Update tab buttons
    cloudTab.classList.toggle('active', tab === 'cloud');
    datacenterTab.classList.toggle('active', tab === 'datacenter');
    
    // Show/hide form fields
    cloudFields.style.display = tab === 'cloud' ? 'block' : 'none';
    datacenterFields.style.display = tab === 'datacenter' ? 'block' : 'none';
    
    // Show/hide datacenter features
    datacenterFeatures.style.display = tab === 'datacenter' ? 'block' : 'none';
}

// Event listeners for tab buttons
cloudTab.addEventListener('click', () => switchTab('cloud'));
datacenterTab.addEventListener('click', () => switchTab('datacenter'));

// Form input handlers
function updateFormData(field, value) {
    formData[field] = value;
}

// Handle GPU type checkboxes
function handleGpuTypeChange(gpu, checked) {
    if (checked) {
        if (!formData.gpuTypes.includes(gpu)) {
            formData.gpuTypes.push(gpu);
        }
    } else {
        formData.gpuTypes = formData.gpuTypes.filter(type => type !== gpu);
    }
}

// Add event listeners to form inputs
document.getElementById('firstName').addEventListener('input', (e) => {
    updateFormData('firstName', e.target.value);
});

document.getElementById('lastName').addEventListener('input', (e) => {
    updateFormData('lastName', e.target.value);
});

document.getElementById('companyName').addEventListener('input', (e) => {
    updateFormData('companyName', e.target.value);
});

document.getElementById('businessEmail').addEventListener('input', (e) => {
    updateFormData('businessEmail', e.target.value);
});

document.getElementById('gpuCount').addEventListener('change', (e) => {
    updateFormData('gpuCount', e.target.value);
});

document.getElementById('startTime').addEventListener('change', (e) => {
    updateFormData('startTime', e.target.value);
});

document.getElementById('deployment').addEventListener('input', (e) => {
    updateFormData('deployment', e.target.value);
});

document.getElementById('marketingConsent').addEventListener('change', (e) => {
    updateFormData('marketingConsent', e.target.checked);
});

// GPU type checkboxes
const gpuCheckboxes = ['h200', 'gb200', 'b200', 'other'];
gpuCheckboxes.forEach(gpu => {
    const checkbox = document.getElementById(gpu);
    if (checkbox) {
        checkbox.addEventListener('change', (e) => {
            handleGpuTypeChange(e.target.value, e.target.checked);
        });
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'companyName', 'businessEmail'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderBottomColor = 'hsl(0 84% 60%)'; // Red color for error
        } else {
            input.style.borderBottomColor = 'hsl(var(--border))'; // Reset to normal
        }
    });
    
    // Validate GPU count for cloud team
    if (activeTab === 'cloud') {
        const gpuCountInput = document.getElementById('gpuCount');
        if (!gpuCountInput.value) {
            isValid = false;
            gpuCountInput.style.borderBottomColor = 'hsl(0 84% 60%)';
        } else {
            gpuCountInput.style.borderBottomColor = 'hsl(var(--border))';
        }
    }
    
    // Validate help type for datacenter team
    if (activeTab === 'datacenter') {
        const helpTypeInput = document.getElementById('helpType');
        if (!helpTypeInput.value) {
            isValid = false;
            helpTypeInput.style.borderBottomColor = 'hsl(0 84% 60%)';
        } else {
            helpTypeInput.style.borderBottomColor = 'hsl(var(--border))';
        }
    }
    
    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Here you would typically send the form data to a server
    console.log('Form submitted with data:', formData);
    console.log('Active tab:', activeTab);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    formData = {
        firstName: '',
        lastName: '',
        companyName: '',
        businessEmail: '',
        gpuCount: '',
        startTime: '',
        gpuTypes: [],
        deployment: '',
        hearAbout: '',
        marketingConsent: false
    };
});

// Enhanced checkbox styling
document.querySelectorAll('.checkbox-item').forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    
    item.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox') {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        }
    });
    
    checkbox.addEventListener('change', () => {
        item.style.borderColor = checkbox.checked ? 'hsl(var(--primary))' : 'hsl(var(--border))';
        item.style.backgroundColor = checkbox.checked ? 'hsl(var(--primary) / 0.05)' : 'transparent';
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial tab state
    switchTab('cloud');
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form validation feedback
function addValidationFeedback() {
    const inputs = document.querySelectorAll('.form-input, .form-select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderBottomColor = 'hsl(0 84% 60%)';
            } else {
                input.style.borderBottomColor = 'hsl(var(--border))';
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderBottomColor = 'hsl(var(--primary))';
        });
    });
}

// Initialize validation feedback
addValidationFeedback();